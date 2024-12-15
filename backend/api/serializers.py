from api.models import User, UserProfile
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone']
        

class UserProfileSerializer(serializers.ModelSerializer):
    registration_date = serializers.DateTimeField(source='user.date_joined', read_only=True)  # add registration_date from the User model
    date_of_birth = serializers.DateField(source='user.profile.date_of_birth', required=False)
    email = serializers.EmailField(source='user.email', read_only=True)
   

    class Meta:
        model = UserProfile
        fields = ['full_name', 'bio', 'phone', 'address', 'email','profile_image', 'verified', 'registration_date', 'date_of_birth']




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['phone'] = user.profile.phone
        token['bio'] = user.profile.bio
        token['profile_image'] = str(user.profile.profile_image.url) if user.profile.profile_image else None
        token['verified'] = user.profile.verified
        
        return token
    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])    
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
