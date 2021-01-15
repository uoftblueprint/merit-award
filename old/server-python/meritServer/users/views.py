from django.contrib.auth.models import User
from django.http import HttpResponse
import json
from rest_framework import generics

from .models import MeritUser
from .serializers import MeritUserSerializer
from pdb import set_trace

class MeritUserCreate(generics.ListCreateAPIView):
    queryset = MeritUser.objects.all()
    serializer_class = MeritUserSerializer

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

    def put(self, request, *args, **kwargs):
        body = request.data
        user = User.objects.get(username=body["username"])
        for key, value in body.items():
            setattr(user, key, value)
        user.save()
        return HttpResponse(json.dumps({"msg": "User sucessfully updated!"}))

    def delete(self, request, *args, **kwargs):
        user = User.objects.get(username=request.data["username"])
        user.delete()
        return HttpResponse(json.dumps({"msg": "User sucessfully deleted!"}))
