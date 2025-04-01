from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.views import View
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.views import LogoutView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from drf_spectacular.utils import extend_schema, OpenApiResponse
from apps.authentication.models import Student  # Import your Student model
from rest_framework import generics
from django.contrib.auth.hashers import make_password  # Import password hashing
from django.contrib.auth import get_user_model, authenticate, login
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from .serializers import StudentRegistrationSerializer, LecturerRegistrationSerializer, LoginSerializer, UserSerializer
from .models import Lecturer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import get_user_model  # Import User model dynamically
from .serializers import AdminRegistrationSerializer
from django.shortcuts import render
import logging
logger = logging.getLogger(__name__)
def home_view(request):
    return render(request, 'home.html') 
@csrf_exempt




def my_view(request):
    logger.info(f"Request path: {request.path}")
    return render(request, "my_template.html", {"name": "John"})


  # Ensure 'name' is passed

  

@method_decorator(csrf_exempt, name='dispatch')
class MyAPIView(View):
    def post(self, request):
        return JsonResponse({"message": "CSRF disabled"})



@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            
            print(f"Login attempt for username: {username}")
            
            # Get the User model
            User = get_user_model()
            
            try:
                user_obj = User.objects.get(username=username)
                print("User found in database")

                if check_password(user_obj.password, password):
                    print("✅ Password is correct!")
                else:
                    print("❌ Password does not match")  
                # Check if password matches
                if not check_password(password, user_obj.password):
                    print("Incorrect password")
                    return Response(
                        {"message": "Invalid credentials", "detail": "Incorrect password."},
                        status=status.HTTP_401_UNAUTHORIZED
                    )
                
            except User.DoesNotExist:
                print("User not found in database")
                return Response(
                    {"message": "Invalid credentials", "detail": "User not found."},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            # Authenticate user
            user = authenticate(username=username, password=password)
            
            if user is not None:
                login(request, user)
                return Response({
                    "message": "Login successful",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "user_type": user.user_type,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                })
            
            return Response(
                {"message": "Invalid credentials", "detail": "Authentication failed."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# views.py
class AdminRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AdminRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"message": "Admin registered successfully!", "admin_id": user.id},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LecturerRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LecturerRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            # Extract user data
            user_data = serializer.validated_data.pop('user')

            # Ensure password is hashed before saving
            User = get_user_model()  # Dynamically get the User model
            user = User.objects.create_user(**user_data)  # Use create_user to ensure password hashing
            
            # Create lecturer
            lecturer = Lecturer.objects.create(user=user, **serializer.validated_data)

            return Response(
                {"message": "Lecturer registered successfully!", "lecturer_id": lecturer.id},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.contrib.auth.hashers import make_password

class StudentRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = StudentRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.validated_data.pop('user')  # Extract user data

            # ✅ Use create_user() to ensure password hashing
            from django.contrib.auth import get_user_model
            User = get_user_model()
            user = User.objects.create_user(**user_data)  

            # ✅ Create the student profile
            student = Student.objects.create(user=user, **serializer.validated_data)

            return Response(
                {"message": "Student registered indeed successfully!", "student_id": student.id},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    

class TestView(View):
    def get(self, request):
        return JsonResponse({"message": "Test view working!"})


class CustomLogoutView(LogoutView):
    """
    Custom logout view to handle logging out a user and returning a message.
    Inherits from Django's built-in LogoutView.
    """
    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        # Optionally, you can return a custom message here
        return JsonResponse({"message": "Successfully logged out!"}, status=status.HTTP_200_OK)
