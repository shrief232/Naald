from rest_framework import serializers
from .models import Product, Category, Vendor, CartOrder, CartOrderItems, Wishlist, ProductImages, ProductReview, WishlistItem 


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ['images', 'date']  



class CategorySerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_title(self, obj):
        request = self.context.get('request')
        language = request.LANGUAGE_CODE if request else 'en'
        return obj.title_ar if language == 'ar' else obj.title   
    


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'
        

class CartOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartOrder
        fields = ['id', 'user', 'new_price', 'paid_status', 'created_at', 'product_status']




class CartOrderItemsSerializer(serializers.ModelSerializer):
    item = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    item_title = serializers.SerializerMethodField()
    product_description = serializers.ReadOnlyField(source='item.description')  # This is already defined
    

    class Meta:
        model = CartOrderItems
        fields = ['id', 'order', 'invoice_no', 'product_status', 'item', 'image', 'description', 'qty', 'price', 'total', 'item_title', 'stock_quantity', 'product_description']

    def validate_qty(self, value):
        if value < 1:
            raise serializers.ValidationError("Quantity must be at least 1.")
        return value
    
    def get_item_title(self, obj):
        return obj.item.title

    def update(self, instance, validated_data):
        qty = validated_data.get('qty', instance.qty)
        if qty is not None:
            if qty > instance.item.quantity:
                raise serializers.ValidationError("Quantity exceeds available stock.")
            if qty > instance.qty:
                instance.increment_qty(qty - instance.qty)
            elif qty < instance.qty:
                instance.decrement_qty(instance.qty - qty)
        instance.save()
        return instance


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = ['id', 'user', 'product', 'review', 'rating', 'date', 'comment', 'created_at']  

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'created_at'] 
    
class WishlistItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = WishlistItem
        fields = ['id', 'product', 'wishlist', 'qty', 'created_at']
        
    def validate_description(self, value):
        if not value.strip():
            raise serializers.ValidationError("Description cannot be empty.")
        return value