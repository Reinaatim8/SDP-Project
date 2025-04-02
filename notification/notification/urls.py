"""
URL configuration for notification project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.http import HttpResponse
from django.urls import path, include
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from notifications.views import NotificationViewSet
#from admin.cont
from django.contrib import admin
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.auth import authenticate,login,logout
#from rest_framework_simplejwt.views import (
    #TokenObtainPairView,
    #TokenRefreshView,
#)
from notifications.views import ProtectedView
from django.conf import settings
from django.conf.urls.static import static




router = DefaultRouter()
router.register(r'', NotificationViewSet, basename='notification')

urlpatterns = [

    
    # Additional custom endpoints
    path('admin/',admin.site.urls),
    path('', lambda r: HttpResponse("Welcome"), name='home'),
    path('unread/', NotificationViewSet.as_view({'get': 'unread'}), name='notification-unread'),
    path('mark-all-read/', NotificationViewSet.as_view({'post': 'mark_all_as_read'}), name='notification-mark-all-read'),
    path('api/token/',obtain_auth_token, name='api_token_auth'),
    #path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('api/protected/', ProtectedView.as_view(), name='protected'),
    path('', include(router.urls)),
] 
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)