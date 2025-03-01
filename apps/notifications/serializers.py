from rest_framework import serializers
from .models import Notification, NotificationSetting

class NotificationSerializer(serializers.ModelSerializer):
    """
    Serializer for the Notification model
    """
    class Meta:
        model = Notification
        fields = ['id', 'notification_type', 'title', 'message', 
                  'created_at', 'read', 'content_type', 'object_id']
        read_only_fields = fields


class NotificationSettingSerializer(serializers.ModelSerializer):
    """
    Serializer for the NotificationSetting model
    """
    class Meta:
        model = NotificationSetting
        fields = ['id', 'email_notifications', 'issue_created_email', 
                  'issue_updated_email', 'issue_resolved_email', 
                  'comment_added_email', 'grade_updated_email']
        read_only_fields = ['id']



