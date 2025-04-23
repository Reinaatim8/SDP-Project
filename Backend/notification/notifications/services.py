
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .models import Notification, EmailNotificationLog
import logging

logger = logging.getLogger(__name__)
#create and store notification
class NotificationService:
    @staticmethod
    def create_notification(recipient, notification_type, title, message, sender=None, action_url=None):
        """
        Creates a notification and sends it via email
        """
        notification = Notification.objects.create(
            recipient=recipient,
            sender=sender,
            notification_type=notification_type,
            title=title,
            message=message,
            action_url=action_url
        )
        
        
        NotificationService.send_email_notification(notification)
        
        return notification
    
    @staticmethod
    def send_email_notification(notification):
        """
        Sends an email notification and logs the result
        """
        try:
            subject = f"AITS Notification: {notification.title}"
            html_message = render_to_string('notifications/email_template.html', {
                'notification': notification,
                'site_name': 'Academic Issue Tracking System'
            })
            plain_message = strip_tags(html_message)
            
            send_mail(
                subject=subject,
                message=plain_message,
                html_message=html_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[notification.recipient.email],
                fail_silently=False
            )
            
            # Log successful email
            EmailNotificationLog.objects.create(
                notification=notification,
                status='success'
            )
            
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            # Log failed email
            EmailNotificationLog.objects.create(
                notification=notification,
                status='failed',
                error_message=str(e)
            )
            