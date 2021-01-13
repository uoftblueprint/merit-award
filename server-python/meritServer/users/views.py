from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
import json

from .models import MeritUser
from .serializers import MeritUserSerializer
from pdb import set_trace

class MeritUserView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    
    queryset = MeritUser.objects.all()
    serializer_class = MeritUserSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        response = {
            "username": user.username,
            "email": user.email
        }
        return HttpResponse(json.dumps(response))

    def put(self, request, *args, **kwargs):
        set_trace()
        body, user = request.data, request.user
        for key, value in body.items():
            setattr(user, key, value)
        user.save()
        return HttpResponse(json.dumps({"msg": "User sucessfully updated!"}))

    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return HttpResponse(json.dumps({"msg": "User sucessfully deleted!"}))


class MeritUserCreateView(generics.ListCreateAPIView):
    permission_classes = (AllowAny)
    authentication_classes = ()

    queryset = MeritUser.objects.all()
    serializer_class = MeritUserSerializer

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = MeritUserSerializer(data=data)
        if not serializer.is_valid():
            return HttpResponse(json.dumps({"msg": "Error."}))

        user = serializer.save()
        response = {
            "msg": "User created successfully!",
            "username": user.username
        }
        return HttpResponse(json.dumps({"msg": response}))
