# notifications/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import Notification
from .services import NotificationService

User = get_user_model()

@receiver(post_save, sender=User)
def send_welcome_notification(sender, instance, created, **kwargs):
    if created:
        NotificationService.create_notification(
            recipient=instance,
            notification_type='general',
            title='Welcome to AITS',
            message='Registration Successful.'
        )
        