from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from issues.models import Issue, CustomUser, Notification

@receiver(post_save, sender=Issue)
def auto_assign_issue(sender, instance, created, **kwargs):
    """
    Automatically assign high-priority issues to an available admin.
    Send notifications to the assigned user.
    """
    if created and not instance.assigned_to:
        if instance.priority == 'high':
            admin_users = CustomUser.objects.filter(role='admin')
            if admin_users.exists():
                instance.assigned_to = admin_users.first()
                instance.save()

    # Send notifications when an issue is assigned or updated
    if instance.assigned_to:
        message = f'You have been assigned a new issue: {instance.title}'

        # Create an in-app notification
        Notification.objects.create(user=instance.assigned_to, message=message)

        # Send an email notification
        send_mail(
            'New Issue Assigned',
            message,
            'admin@tracking-system.com',
            [instance.assigned_to.email],
            fail_silently=True
        )








