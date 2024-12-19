from django.db import models
from api.models import User
from core.models import CartOrderItems  

class PaymentMethod(models.Model):
    METHOD_CHOICES = [
        ('visa', 'Visa'),
        ('mastercard', 'Mastercard'),
        ('paypal', 'PayPal'),
        ('vodafone_cash', 'Vodafone Cash'),
    ]
    name = models.CharField(max_length=50, choices=METHOD_CHOICES, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.get_name_display()


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cart = models.ForeignKey(CartOrderItems, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True)
    transaction_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed')],
        default='pending',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment {self.transaction_id} - {self.status}"
