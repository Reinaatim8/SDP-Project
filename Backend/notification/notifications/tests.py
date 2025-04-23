
from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Notification, EmailNotificationLog
from .services import NotificationService

User = get_user_model()
#Creates test user instance
class NotificationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )
    #Tests notification creation service
    def test_create_notification(self):
        notification = NotificationService.create_notification(
            recipient=self.user,
            notification_type='general',
            title='Test Notification',
            message='This is a test notification.'
        )
        
        self.assertEqual(Notification.objects.count(), 1)
        self.assertEqual(notification.recipient, self.user)
        self.assertEqual(notification.title, 'Test Notification')
        
        # Check that email was logged
        self.assertEqual(EmailNotificationLog.objects.count(), 1)
        email_log = EmailNotificationLog.objects.first()
        self.assertEqual(email_log.notification, notification)
    
    def test_mark_as_read(self):
        notification = Notification.objects.create(
            recipient=self.user,
            title='Unread Notification',
            message='This should be marked as read',
            is_read=False
        )
        
        notification.is_read = True
        notification.save()
        
        updated_notification = Notification.objects.get(pk=notification.pk)
        self.assertTrue(updated_notification.is_read)