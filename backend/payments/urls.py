from django.urls import path
from . import views

urlpatterns = [
    path('process-visa/', views.process_visa_payment, name='process_visa'),
    path('process-paypal/', views.process_paypal_payment, name='process_paypal'),
    path('process-vodafone-cash/', views.process_vodafone_cash_payment, name='process_vodafone_cash'),
]
