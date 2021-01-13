from rest_framework import serializers
from django.contrib.auth.models import User
from pdb import set_trace

from .models import MeritUser, UserType


class UserTypeSerializer(serializers.ModelSerializer):
  model = UserType


class MeritUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
      required=True,
      source="user.username"
    )
    email = serializers.CharField(
      required=True,
      source="user.email"
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password', 'placeholder': 'Password'},
        source="user.password"
    )
    user_types = UserTypeSerializer(read_only=True, many=True)

    class Meta:
        model = MeritUser
        fields = ("username", "email", "password", "user_types")

    def create(self, validated_data):
        user_data = validated_data["user"]
        user = User.objects.create(**user_data)
        user.set_password(user_data["password"])
        validated_data.pop("user")
        for key, value in validated_data.items():
          setattr(user, key, value)
        user.save()
        return user
