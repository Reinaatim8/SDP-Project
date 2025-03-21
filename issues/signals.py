from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Issue, CustomUser

@receiver(post_save, sender=Issue)
def auto_assign_issue(sender, instance, created, **kwargs):
    if created and not instance.assigned_to:
        if instance.priority == 'high':
            admin_users = CustomUser.objects.filter(role='admin')
            if admin_users.exists():
                instance.assigned_to = admin_users.first()
                instance.save()