from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class Notification(models.Model):
    NOTIFICATION_TYPES = (
        ('grade_update', 'Grade Update'),
        ('request_status', 'Request Status Change'),
        ('system_alert', 'System Alert'),
        ('general', 'General Message'),
    )
    
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    action_url = models.URLField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.notification_type} notification for {self.recipient.email}"

class EmailNotificationLog(models.Model):
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)
    sent_at = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=50)
    error_message = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return f"Email log for {self.notification}"