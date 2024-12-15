from django.contrib import admin
from .models import User, UserProfile

class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email']

class UserProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified' ]
    list_display = ['user', 'full_name', 'verified' ]


admin.site.register(User,UserAdmin)
admin.site.register(UserProfile, UserProfileAdmin)    
