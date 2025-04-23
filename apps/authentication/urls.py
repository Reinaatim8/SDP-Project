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
from .views import my_view 
from .views import AdminRegistrationView 
from .views import UserProfileView
urlpatterns = [
    path('register/student', StudentRegistrationView.as_view(), name='register-student'),
    path('register/lecturer', LecturerRegistrationView.as_view(), name='register-lecturer'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', CustomLogoutView.as_view(), name='logout'),  
    path('auth-token/', obtain_auth_token, name='auth-token'),
    path('test', TestView.as_view(), name='test-view'),
    path('register/admin', AdminRegistrationView.as_view(), name='register-admin'),
    path('', my_view, name="auth_home"),
    path('api/profile/', UserProfileView.as_view(), name='user-profile')
]
