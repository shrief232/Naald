from functools import cache
import random
import requests
from django.shortcuts import render
from django.conf import settings
from rest_framework.decorators import api_view
from .models import User, UserProfile
from .serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer, UserProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer



@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    user = request.user
    try:
        profile = UserProfile.objects.get(user=request.user)

        if request.method == 'GET':
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            serializer = UserProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except UserProfile.DoesNotExist:
        return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)




@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def dashboardView(request):
    user = request.user

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        data = request.data
        profile = user.profile

        profile.full_name = data.get('full_name', profile.full_name)
        profile.bio = data.get('bio', profile.bio)
        profile.phone = data.get('phone', profile.phone)
        profile.address = data.get('address', profile.address)

        if 'profile_image' in request.FILES:
            profile.profile_image = request.FILES['profile_image']

        profile.save()
        return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)





# Function to send OTP via Textlocal API
def send_otp_via_sms(phone_number, otp):
    api_key = settings.TEXTLOCAL_API_KEY  # Set your Textlocal API Key in settings.py
    sender = settings.TEXTLOCAL_SENDER  # Set the sender ID
    url = "https://api.textlocal.in/send/"
    
    message = f"Your OTP is {otp}."

    params = {
        'apikey': api_key,
        'numbers': phone_number,
        'message': message,
        'sender': sender
    }

    response = requests.get(url, params=params)
    return response.json()

@api_view(['POST'])
def send_otp_sms(request):
    phone_number = request.data.get('phone_number')
    if not phone_number:
        return Response({"detail": "Phone number is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Generate a random 6-digit OTP
    otp = random.randint(100000, 999999)

    # Store OTP in cache for verification later (valid for 5 minutes)
    cache.set(f'otp_{phone_number}', otp, timeout=300)

    # Send OTP via SMS
    response = send_otp_via_sms(phone_number, otp)

    # Check if the SMS was successfully sent
    if response.get("status") == "success":
        return Response({"detail": "OTP sent successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"detail": "Failed to send OTP"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def verify_otp(request):
    phone_number = request.data.get('phone_number')
    otp = request.data.get('otp')
    
    if not phone_number or not otp:
        return Response({"detail": "Phone number and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if OTP matches
    cached_otp = cache.get(f'otp_{phone_number}')
    if cached_otp == int(otp):
        return Response({"detail": "OTP verified successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"detail": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
