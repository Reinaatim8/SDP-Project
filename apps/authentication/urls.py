from django.views.decorators.csrf import csrf_exempt
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import (
    StudentRegistrationView,
    LecturerRegistrationView,
    LoginView,
    CustomLogoutView,
    TestView
)

urlpatterns = [
    path('register/student', StudentRegistrationView.as_view(), name='register-student'),
    path('register/lecturer', LecturerRegistrationView.as_view(), name='register-lecturer'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', CustomLogoutView.as_view(), name='logout'),  
    path('auth-token/', obtain_auth_token, name='auth-token'),
    path('test', TestView.as_view(), name='test-view'),
]
