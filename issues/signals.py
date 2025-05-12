from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.apps import apps  # ✅ Added to dynamically get models
from issues.models import Issue, CustomUser, Notification  # ✅ Importing models directly

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
#Creates issue notification signal
@receiver(post_save, sender=apps.get_model('issues', 'Issue'))  
def create_notification(sender, instance, created, **kwargs):
    if created:
        Notification = apps.get_model('issues', 'Notification')  # ✅ Fix import
        Notification.objects.create(message=f"Issue {instance.id} created.")







