from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
import json
from pdb import set_trace

def main(request):
    html = "<html><body>server is alive lmao</body></html>"
    return HttpResponse(html)

@csrf_exempt
def login(request):
    body = json.loads(request.body)
    username, password = body["username"], body["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        token_pair = get_token_pair(user)
        return HttpResponse(json.dumps(token_pair))
    else:
        return HttpResponse(json.dumps({"msg": "Invalid username or password!"}))

def get_token_pair(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    
