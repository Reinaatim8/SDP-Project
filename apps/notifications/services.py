from django.core.mail import send_mail
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from .models import Notification

class NotificationService:
    @staticmethod
    def create_notification(recipient, notification_type, title, message, related_object=None):
        """
        Create a new notification and store it in the database
        """
        notification = Notification(
            recipient=recipient,
            notification_type=notification_type,
            title=title,
            message=message
        )
        
        # If there's a related object (like an Issue), store the reference
        if related_object:
            content_type = ContentType.objects.get_for_model(related_object)
            notification.content_type = content_type
            notification.object_id = related_object.id
            
        notification.save()
        return notification

    @staticmethod
    def send_email_notification(notification):
        """
        Send an email for a notification if the user has email notifications enabled
        """
        # Check if the user wants email notifications for this type
        user_settings = notification.recipient.notification_settings
        setting_name = f"{notification.notification_type}_email"
        
        if not user_settings.email_notifications or not getattr(user_settings, setting_name, True):
            return False
            
        # Prepare email content
        context = {
            'user': notification.recipient,
            'notification': notification,
            'site_url': settings.SITE_URL,
        }
        
        # If there's a related object, add its URL to the context
        if notification.content_object:
            object_type = notification.content_type.model
            if object_type == 'issue':
                context['object_url'] = f"{settings.SITE_URL}/issues/{notification.object_id}"
            elif object_type == 'grade':
                context['object_url'] = f"{settings.SITE_URL}/grades/{notification.object_id}"
        
        # Render email content from template
        html_message = render_to_string(f'notifications/emails/{notification.notification_type}.html', context)
        plain_message = strip_tags(html_message)
        
        # Send the email
        try:
            send_mail(
                subject=notification.title,
                message=plain_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[notification.recipient.email],
                html_message=html_message,
                fail_silently=False
            )
            notification.emailed = True
            notification.save(update_fields=['emailed'])
            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False

    @staticmethod
    def mark_as_read(notification_id, user):
        """
        Mark a notification as read
        """
        try:
            notification = Notification.objects.get(id=notification_id, recipient=user)
            notification.read = True
            notification.save(update_fields=['read'])
            return True
        except Notification.DoesNotExist:
            return False

    @staticmethod
    def get_unread_count(user):
        """
        Get the count of unread notifications for a user
        """
        return Notification.objects.filter(recipient=user, read=False).count()