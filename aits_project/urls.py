from django.contrib import admin
from django.urls import path, include
from apps.authentication import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('apps.authentication.urls')),
    
]