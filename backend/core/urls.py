from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf.urls.i18n import i18n_patterns
from .views import (
    ProductViewSet,
    CategoryViewSet,
    VendorViewSet,
    CartOrderViewSet,
    CartOrderItemsViewSet,
    WishlistViewSet,
    CartOrderTotalView,
    WishlistItemViewSet,
    SearchView,
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'vendors', VendorViewSet, basename='vendor')
router.register(r'cart-orders', CartOrderViewSet, basename='cartorder')
router.register(r'cart-order-items', CartOrderItemsViewSet, basename='cartorderitem')
router.register(r'wishlist', WishlistViewSet, basename='wishlist')
router.register(r'wishlist-items', WishlistItemViewSet, basename='wishlist-item')


urlpatterns = [
    path('', include(router.urls)),
    path('cart-order-total/', CartOrderTotalView.as_view(), name='cart_order_total'),
    path('search/', SearchView.as_view(), name='search'), 
]