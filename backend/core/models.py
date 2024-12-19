from django.db import models
from datetime import datetime
from shortuuid.django_fields import ShortUUIDField
from django.utils.safestring import mark_safe
from django.conf import settings
from django.db.models import Sum
from django_countries.fields import CountryField
from api.models import User
from parler.models import TranslatableModel, TranslatedFields
from django.utils.translation import gettext_lazy as _


# Define choices
STATUS_CHOICES = (
    ("process", "Processing"),
    ("shipped", "Shipped"),
    ("delivered", "Delivered"),
)

STATUS = (
    ("draft", "Draft"),
    ("rejected", "Rejected"),
    ("in_review", "In Review"),
    ("published", "Published"),
)

RATING = (
    (1, "★☆☆☆☆"),
    (2, "★★☆☆☆"),
    (3, "★★★☆☆"),
    (4, "★★★★☆"),
    (5, "★★★★★"),
)

def user_directory_path(instance, filename):
    return f'user_{instance.user.username}/{filename}'

class Item(models.Model):
    name = models.CharField(max_length=100)
    # other fields...

    def __str__(self):
        return self.name

class ItemVariation(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    # Add your fields for ItemVariation

    def __str__(self):
        return f"Variation for {self.item.name}"

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='core_orders')
    ordered = models.BooleanField(default=False)
    ordered_date = models.DateTimeField()

    def __str__(self):
        return f"Order {self.id}"

class Category(models.Model):
    cid = ShortUUIDField(unique=True, length=10, max_length=30, prefix="cat", alphabet="abcdefgh12345")
    title = models.CharField(max_length=100, default="simit")
    title_ar = models.CharField(max_length=100, default="simit_ar")
    image = models.ImageField(upload_to="category", default="category.jpg")

    class Meta:
        verbose_name_plural = "Categories"

    def category_image(self):
        return mark_safe(f'<img src="{self.image.url}" width="50%" height="50%"/>')

    def __str__(self):
        return self.title

class Vendor(models.Model):
    vid = ShortUUIDField(unique=True, length=10, max_length=30, prefix="ven", alphabet="abcdefgh12345")
    title = models.CharField(max_length=100, default="Naald")
    image = models.ImageField(upload_to=user_directory_path, default="vendor.jpg")
    description = models.TextField(null=True, blank=True, default="I am amazing vendor")
    address = models.CharField(max_length=100, default="123 Main Street")
    contact = models.CharField(max_length=100, default="+020 (456) 789")
    chat_resp_time = models.CharField(max_length=100, default="100")
    shipping_on_time = models.CharField(max_length=100, default="100")
    authentic_rating = models.CharField(max_length=100, default="100")
    days_return = models.CharField(max_length=100, default="100")
    warranty_period = models.CharField(max_length=100, default="100")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='vendors')

    class Meta:
        verbose_name_plural = "Vendors"

    def vendor_image(self):
        return mark_safe(f'<img src="{self.image.url}" width="50%" height="50%"/>')

    def __str__(self):
        return self.title

class Product(models.Model):
    pid = ShortUUIDField(unique=True, length=10, max_length=20, alphabet="abcdefgh12345")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    title = models.CharField(max_length=100, default="Fresh Pear")
    title_ar = models.CharField(max_length=100, default="Fresh Pear")
    image = models.ImageField(upload_to=user_directory_path, default="product.jpg")
    description = models.TextField(null=True, blank=True, default="This is the product")
    description_ar = models.TextField(null=True, blank=True, default="هذا المنتج")
    price = models.DecimalField(max_digits=10, decimal_places=2, default="1.99")
    price_ar = models.DecimalField(max_digits=10, decimal_places=2, default="1.99")
    old_price = models.DecimalField(max_digits=10, decimal_places=2, default="2.99")
    specifications = models.TextField(null=True, blank=True)
    specifications_ar = models.TextField(null=True, blank=True)
    product_status = models.CharField(choices=STATUS, max_length=10, default="in_review")
    status = models.BooleanField(default=True)
    in_stock = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    digital = models.BooleanField(default=False)
    sku = ShortUUIDField(unique=True, length=4, max_length=10, prefix="sku", alphabet="1234567890")
    date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    quantity = models.PositiveIntegerField(default=0)  

    class Meta:
        verbose_name_plural = "Products"

    def product_image(self):
        return mark_safe(f'<img src="{self.image.url}" width="50%" height="50%"/>')

    def __str__(self):
        return self.title

    def get_percentage(self):
        """
        Calculate the percentage difference between old_price and price.
        Returns 0 if old_price is None, 0, or equal to price.
        """
        if not self.old_price or self.old_price == self.price:
            return 0
        return round(((self.old_price - self.price) / self.old_price) * 100, 1)


class ProductImages(models.Model):
    images = models.ImageField(upload_to="product-image", default="product.jpg")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name='images')
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Products Image"

class CartOrder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart_orders')
    new_price = models.DecimalField(max_digits=10, decimal_places=2, default='1.99')
    paid_status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    product_status = models.CharField(choices=STATUS_CHOICES, max_length=30, default="process")

    class Meta:
        verbose_name_plural = "Cart Orders"

    def __str__(self):
        return f'CartOrder {self.id}'


class CartOrderItems(models.Model):
    order = models.ForeignKey(CartOrder, on_delete=models.CASCADE, related_name='items')
    invoice_no = models.CharField(max_length=100, default='DEFAULT_INVOICE')
    product_status = models.CharField(max_length=20, default='pending')
    item = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_items')
    item_title = models.CharField(max_length=255, default='Unknown Title')
    Item_title_ar = models.CharField(max_length=100, default="Fresh Pear")
    image = models.ImageField(upload_to="item-image", default="item.jpg")
    qty = models.PositiveIntegerField(default=1)
    stock_quantity = models.PositiveIntegerField(default=0)  
    price = models.DecimalField(max_digits=10, decimal_places=2, default=1.99)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=1.99)
    description = models.TextField(blank=True, default='')
    description_ar = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(default=datetime.now)


    
    class Meta:
        verbose_name_plural = "Cart Order Items"

    def __str__(self):
        return self.item_title

    def order_img(self):
        return mark_safe(f'<img src="{self.image.url}" width="50%" height="50%"/>')

    def save(self, *args, **kwargs):
        if self.pk is None:
            # New item
            self.stock_quantity = self.item.quantity
        else:
            # Existing item
            self.stock_quantity = self.item.quantity
        self.total = self.qty * self.price
        if not self.description:
            self.description = self.item.description  
        super().save(*args, **kwargs)

    def increment_qty(self, amount=1):
        """Increments the quantity by a specified amount."""
        if self.qty + amount > self.item.quantity:
            raise ValueError("Cannot increment. Quantity exceeds available stock.")
        self.qty += amount
        self.total = self.qty * self.price
        self.save()

    def decrement_qty(self, amount=1):
        """Decrements the quantity by a specified amount."""
        if self.qty - amount < 0:
            raise ValueError("Quantity cannot be negative.")
        self.qty -= amount
        self.total = self.qty * self.price
        self.save()

class ProductReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    review = models.TextField()
    rating = models.IntegerField(choices=RATING, default=1)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Product Reviews"

    def __str__(self):
        return self.product.title

    def get_rating(self):
        return self.rating


class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user',)
    

class WishlistItem(models.Model):
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name='items')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  
    created_at  = models.DateTimeField(auto_now_add=True)
    qty = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('wishlist', 'product') 


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='addresses')
    address_line1 = models.CharField(max_length=255, null=True)
    status = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Addresses"

class OrderItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='order_items')
    ordered = models.BooleanField(default=False)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='order_items')
    item_variations = models.ManyToManyField(ItemVariation, related_name='order_items')
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.name}"