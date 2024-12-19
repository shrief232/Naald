from rest_framework_simplejwt.views import  TokenRefreshView
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static





urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('dashboard/', views.dashboardView),  
    path('profile/', views.user_profile_view),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('send-otp/', views.send_otp_sms),
    path('verify-otp/', views.verify_otp),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)