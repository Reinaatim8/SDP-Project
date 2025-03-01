from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import NotificationViewSet, NotificationSettingViewSet

router = DefaultRouter()
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'notification-settings', NotificationSettingViewSet, basename='notification-settings')

urlpatterns = [
    path('', include(router.urls)),
]