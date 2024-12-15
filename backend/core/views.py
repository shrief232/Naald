from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
# from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.shortcuts import render, get_object_or_404
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q
from .models import OrderItem, Product, Category, Vendor, CartOrder, CartOrderItems, Wishlist, Item, ItemVariation, Order, WishlistItem
from .serializers import ProductSerializer, CategorySerializer, VendorSerializer, CartOrderSerializer, CartOrderItemsSerializer, WishlistSerializer, WishlistItemSerializer
from django_filters.rest_framework import DjangoFilterBackend

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category__title', 'category__title_ar','title', 'title_ar']

    def get_queryset(self):
        queryset = super().get_queryset()
        language = self.request.query_params.get('language', 'en').lower() 
        category_title = self.request.query_params.get('category_title')
        title = self.request.query_params.get('title', None)

        if category_title:
            if language == 'ar':
                queryset = queryset.filter(category__title_ar=category_title)
            else:
                queryset = queryset.filter(category__title=category_title)

        return queryset
    
        if title:
            if language == 'ar':
                queryset = queryset.filter(title_ar__icontains=title)
            else:
                queryset = queryset.filter(title__icontains=title)
        
        return queryset



class SearchView(APIView):
    def get(self, request):
        query = request.query_params.get('query', None)  

        if query:
            products = Product.objects.filter(
                Q(title__icontains=query) | 
                Q(title_ar__icontains=query) | 
                Q(category__title__icontains=query) | 
                Q(category__title_ar__icontains=query)
            )
        else:
            products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

class CartOrderViewSet(viewsets.ModelViewSet):
    serializer_class = CartOrderSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        user = self.request.user
        return CartOrder.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data.copy()
        data['user'] = user.id
        return super().create(request, *args, **kwargs)



class CartOrderItemsViewSet(viewsets.ModelViewSet):
    serializer_class = CartOrderItemsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        cart_orders = CartOrder.objects.filter(user=user)
        return CartOrderItems.objects.filter(order__in=cart_orders)

    def create(self, request, *args, **kwargs):
        try:
            product_id = request.data.get('item')
            quantity = int(request.data.get('qty', 1))
            cart_order_id = request.data.get('cart_order')

            product = Product.objects.get(id=product_id)
            cart_order = CartOrder.objects.get(id=cart_order_id, user=request.user)
            item, created = CartOrderItems.objects.update_or_create(
                order=cart_order,
                item=product,
                defaults={
                    'image': product.image,
                    'qty': quantity,
                    'description': product.description,
                    'price': product.price,
                    'total': quantity * product.price
                }
            )
            if not created:
                item.increment_qty(quantity - item.qty)
            return Response(self.get_serializer(item).data, status=status.HTTP_201_CREATED)
        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
        except CartOrder.DoesNotExist:
            return Response({"error": "Cart order not found."}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        
class CartOrderTotalView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        try:
            cart_items = CartOrderItems.objects.filter(order__user=user)
            total = sum(item.total for item in cart_items)
            return Response({"total": total}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CartOrderItemsUpdateView(generics.UpdateAPIView):
    queryset = CartOrderItems.objects.all()
    serializer_class = CartOrderItemsSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        item = self.get_object()
        quantity = request.data.get('qty')

        if quantity is not None:
            if quantity < 1:
                return Response({"error": "Quantity must be at least 1."}, status=status.HTTP_400_BAD_REQUEST)

            if quantity > item.stock_quantity:
                return Response({"error": "Quantity exceeds available stock."}, status=status.HTTP_400_BAD_REQUEST)

            item.qty = quantity
            item.save()
            serializer = self.get_serializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Quantity is required."}, status=status.HTTP_400_BAD_REQUEST)
    
class CartOrderItemsDeleteView(generics.DestroyAPIView):
    queryset = CartOrderItems.objects.all()
    serializer_class = CartOrderItemsSerializer
    permission_classes = [IsAuthenticated]
    

class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('user')
        if not user_id:
            return Response({"error": "User ID is required."}, status=400)
        return super().create(request, *args, **kwargs)


class WishlistItemViewSet(viewsets.ModelViewSet):
    queryset = WishlistItem.objects.all()
    serializer_class = WishlistItemSerializer
    

    def create(self, request, *args, **kwargs):
        wishlist_id = request.data.get('wishlist')
        product_id = request.data.get('product')
        
        if not wishlist_id or not product_id:
            return Response({"error": "Wishlist and product IDs are required."}, status=400)

        wishlist = get_object_or_404(Wishlist, id=wishlist_id)
        product = get_object_or_404(Product, id=product_id)

        # Create the wishlist item
        wishlist_item = WishlistItem.objects.create(
            wishlist=wishlist,
            user=request.user,
            product=product,
        )
        return Response(self.get_serializer(wishlist_item).data, status=status.HTTP_201_CREATED)
    
    def destroy(self, request, *args, **kwargs):
            wishlist_item = self.get_object()
            wishlist_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


class AddToCartView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        variations = request.data.get('variations', [])
        if slug is None:
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)

        item = get_object_or_404(Item, slug=slug)

        minimum_variation_count = ItemVariation.objects.filter(item=item).count()
        if len(variations) < minimum_variation_count:
            return Response({"message": "Please specify the required variation types"}, status=HTTP_400_BAD_REQUEST)

        order_item_qs = OrderItem.objects.filter(
            item=item,
            user=request.user,
            ordered=False
        )
        for v in variations:
            order_item_qs = order_item_qs.filter(
                Q(item_variations__exact=v)
            )

        if order_item_qs.exists():
            order_item = order_item_qs.first()
            order_item.quantity += 1
            order_item.save()
        else:
            order_item = OrderItem.objects.create(
                item=item,
                user=request.user,
                ordered=False
            )
            order_item.item_variations.add(*variations)
            order_item.save()

        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if not order.items.filter(item__id=order_item.id).exists():
                order.items.add(order_item)
                return Response(status=HTTP_200_OK)

        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                user=request.user, ordered_date=ordered_date)
            order.items.add(order_item)
            return Response(status=HTTP_200_OK)