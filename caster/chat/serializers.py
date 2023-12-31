from rest_framework.serializers import ModelSerializer,CharField
from .models import *

from django.contrib.auth.models import User

class UserRegistrationSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class ServerLocationSerializer(ModelSerializer):
    class Meta:
        model = Server
        fields = '__all__'