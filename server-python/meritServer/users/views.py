from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction

import json
from pdb import set_trace
from .models import MeritUser

# TODO: remove this decorator
@csrf_exempt
def users(request):
    response = "Success!"
    if request.method == "GET":
        response = get_users()
        return HttpResponse(response)
    elif request.method == "POST":
        try:
            create_user(request)
        except Exception as e:
            response = "There was an error when creating a new user."
    elif request.method == "PUT":
        try:
            update_user(request)
        except Exception as e:
            response = "There was an error when updating user."
    elif request.method == "DELETE":
        try:
            delete_user(request)
        except Exception as e:
            response = "There was an error when deleting a user."
    return HttpResponse(json.dumps({"msg": response}), content_type="application/json")

def get_users():
    users = MeritUser.objects.all()
    res = {
        "users": {}
    }
    for user in users:
        curr = user.user
        res["users"][curr.username] = {
            "id": curr.id,
            "first_name": curr.first_name,
            "last_name": curr.last_name,
            "username": curr.username,
            "email": curr.email,
        }

    return json.dumps(res)

def create_user(request):
    body = request.POST
    new_user = User.objects.create(username=body["username"], password=body["password"], email=body["email"])

def delete_user(request):
    user = User.objects.get(id=request.DELETE["id"])
    user.delete()

def update_user(request):
    body = request.PUT
    user = User.objects.get(id=body["id"])
    for key, value in body.items():
        setattr(user, key, value)
    user.save()
