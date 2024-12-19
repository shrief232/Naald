from django.http import JsonResponse
from .models import Payment, PaymentMethod
import uuid  
import stripe
import paypalrestsdk


stripe.api_key = 'your-stripe-secret-key'


def process_visa_payment(request):
    try:
       
        charge = stripe.Charge.create(
            amount=int(request.POST.get('amount')) * 100, 
            currency='usd',
            source=request.POST.get('token'),  
            description='Visa Payment',
        )
        transaction_id = charge['id']
        Payment.objects.create(
            user=request.user,
            amount=request.POST.get('amount'),
            method=PaymentMethod.objects.get(name='visa'),
            transaction_id=transaction_id,
            status='completed',
        )
        return JsonResponse({'status': 'success', 'transaction_id': transaction_id})
    except Exception as e:
        return JsonResponse({'status': 'failed', 'error': str(e)})


paypalrestsdk.configure({
    "mode": "sandbox",  # or "live" for production
    "client_id": "your-client-id",
    "client_secret": "your-client-secret",
})

def process_paypal_payment(request):
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {"payment_method": "paypal"},
        "transactions": [{
            "amount": {
                "total": request.POST.get('amount'),
                "currency": "USD"
            },
            "description": "PayPal Payment"
        }],
        "redirect_urls": {
            "return_url": "http://localhost:8000/payments/success",
            "cancel_url": "http://localhost:8000/payments/cancel",
        }
    })

    if payment.create():
        transaction_id = payment.id
        Payment.objects.create(
            user=request.user,
            amount=request.POST.get('amount'),
            method=PaymentMethod.objects.get(name='paypal'),
            transaction_id=transaction_id,
            status='pending',
        )
        return JsonResponse({'status': 'success', 'transaction_id': transaction_id})
    else:
        return JsonResponse({'status': 'failed', 'error': payment.error})

def process_vodafone_cash_payment(request):
    
    try:
        transaction_id = str(uuid.uuid4())
        
        Payment.objects.create(
            user=request.user,
            amount=request.POST.get('amount'),
            method=PaymentMethod.objects.get(name='vodafone_cash'),
            transaction_id=transaction_id,
            status='completed',
        )
        return JsonResponse({'status': 'success', 'transaction_id': transaction_id})
    except Exception as e:
        return JsonResponse({'status': 'failed', 'error': str(e)})
