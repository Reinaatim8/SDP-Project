from django.contrib import admin
from django.urls import path, include
from apps.authentication import views
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('apps.authentication.urls')),
    
    path('issues/', include('apps.issues.urls')),
    #path('', include('apps.issues.urls')), 
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # ✅ Add this
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # ✅ Add this
]
