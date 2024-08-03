from rest_framework import status
from rest_framework.response import Response
import json
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse

@csrf_exempt
@require_POST
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        print(username, password)
        if not username or not password:
            return JsonResponse({"detail": "Please provide both username and password"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)
        if user is None:
            user_by_email = User.objects.filter(email=username).first()
            if user_by_email and check_password(password, user_by_email.password):
                user = user_by_email
            else:
                return JsonResponse({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            login(request, user)
            print("Login successful", request.user.username)
            user.last_login = timezone.now()
            user.save()
            return JsonResponse({"detail": "Successfully logged in!"}, status=status.HTTP_200_OK)
    
    return JsonResponse({"detail": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
@login_required
def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail":"You are not logged in!"}, status=status.HTTP_400_BAD_REQUEST)
    print(request.user.username)
    logout(request)
    print("Logout successful=", request.user.username)
    return JsonResponse({"detail":"Successfully logged out!"}, status=status.HTTP_200_OK)

@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False}, status=status.HTTP_200_OK)
    return JsonResponse({"isAuthenticated": True}, status=status.HTTP_200_OK)

@login_required
def whoami_view(request):
    print("loged_user", request.user.username)
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False}, status=status.HTTP_200_OK)
    return JsonResponse({"username": request.user.username}, status=status.HTTP_200_OK)

