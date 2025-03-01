from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class Notification(models.Model):
    """
    Model for storing notification data
    """
    NOTIFICATION_TYPES = (
        ('issue_created', 'New Issue Created'),
        ('issue_updated', 'Issue Updated'),
        ('issue_resolved', 'Issue Resolved'),
        ('comment_added', 'Comment Added'),
        ('grade_updated', 'Grade Updated'),
    )

    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=255)
    message = models.TextField()
    
    # For linking to different models (Issue, Grade, etc.)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey('content_type', 'object_id')
    
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    emailed = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.notification_type} for {self.recipient.username}"


class NotificationSetting(models.Model):
    """
    Model to store user notification preferences
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='notification_settings')
    email_notifications = models.BooleanField(default=True)
    
    # Specific notification type preferences
    issue_created_email = models.BooleanField(default=True)
    issue_updated_email = models.BooleanField(default=True)
    issue_resolved_email = models.BooleanField(default=True)
    comment_added_email = models.BooleanField(default=True)
    grade_updated_email = models.BooleanField(default=True)
    
    def __str__(self):
        return f"Notification settings for {self.user.username}"
