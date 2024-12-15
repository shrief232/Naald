from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Product, Category, Vendor, CartOrder, CartOrderItems, ProductImages, ProductReview, Wishlist, Address, WishlistItem

class ProductImagesAdmin(admin.TabularInline):
    model = ProductImages
    fields = ('images',)
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImagesAdmin]
    list_display = ('id', 'title', 'price', 'get_percentage', 'product_image_display')
    ordering = ('-date',)
    search_fields = ('title', 'description')
    list_filter = ('category', 'product_status')

    def get_percentage(self, obj):
        return obj.get_percentage()
    get_percentage.short_description = 'Discount Percentage'

    def product_image_display(self, obj):
        return mark_safe(f'<img src="{obj.image.url}" width="100" height="100" />')
    product_image_display.short_description = 'Product Image'

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'category_image']

class VendorAdmin(admin.ModelAdmin):
    list_display = ['title', 'vendor_image']

class CartOrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'created_at']

class CartOrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'invoice_no', 'order_img', 'qty', 'price', 'total', 'stock_quantity']

class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'review', 'rating']
    search_fields = ('user__username', 'product__title')

class WishlistItemInline(admin.TabularInline):
    list_display = ['order', 'Review', 'order_img', 'qty', 'price']

class WishlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at') 


class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'address_line1', 'status')

admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Vendor, VendorAdmin)
admin.site.register(CartOrder, CartOrderAdmin)
admin.site.register(CartOrderItems, CartOrderItemAdmin)
admin.site.register(ProductReview, ProductReviewAdmin)
admin.site.register(Wishlist, WishlistAdmin)
admin.site.register(WishlistItem)
admin.site.register(Address, AddressAdmin)