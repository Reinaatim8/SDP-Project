from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Notification, NotificationSetting
from .serializers import NotificationSerializer, NotificationSettingSerializer
from .services import NotificationService

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing notifications
    """
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Return notifications for the current user
        """
        return Notification.objects.filter(recipient=self.request.user)
    
    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        """
        Mark a notification as read
        """
        success = NotificationService.mark_as_read(pk, request.user)
        if success:
            return Response({'status': 'notification marked as read'})
        return Response(
            {'error': 'Notification not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    @action(detail=False, methods=['post'])
    def mark_all_as_read(self, request):
        """
        Mark all notifications as read
        """
        notifications = Notification.objects.filter(
            recipient=request.user, 
            read=False
        )
        notifications.update(read=True)
        return Response({'status': f'marked {notifications.count()} notifications as read'})
    
    @action(detail=False, methods=['get'])
    def unread_count(self, request):
        """
        Get count of unread notifications
        """
        count = NotificationService.get_unread_count(request.user)
        return Response({'unread_count': count})


class NotificationSettingViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing notification settings
    """
    serializer_class = NotificationSettingSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Return the notification settings for the current user
        """
        return NotificationSetting.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """
        Ensure settings are created for the current user
        """
        serializer.save(user=self.request.user)