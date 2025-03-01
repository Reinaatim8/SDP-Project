from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

from .models import NotificationSetting

@receiver(post_save, sender=User)
def create_notification_settings(sender, instance, created, **kwargs):
    """
    Create default notification settings for new users
    """
    if created:
        NotificationSetting.objects.create(user=instance)


def create_issue_notifications(issue):
    """
    Create notifications when a new issue is created
    """
    from issues.models import Issue  # Import here to avoid circular imports
    from .services import NotificationService
    
    # Notify relevant lecturer
    if issue.course and issue.course.lecturer:
        lecturer = issue.course.lecturer
        NotificationService.create_notification(
            recipient=lecturer,
            notification_type='issue_created',
            title=f'New Issue: {issue.title}',
            message=f'A student has reported an issue with {issue.course.name}.',
            related_object=issue
        )
    
    # Notify administrators
    admin_users = User.objects.filter(is_staff=True)
    for admin in admin_users:
        NotificationService.create_notification(
            recipient=admin,
            notification_type='issue_created',
            title=f'New Issue: {issue.title}',
            message=f'A new issue has been created for {issue.course.name if issue.course else "a course"}.',
            related_object=issue
        )


def create_issue_update_notification(issue, user):
    """
    Create notification when an issue is updated
    """
    from .services import NotificationService
    
    # Notify the issue creator if the updater is different
    if issue.created_by != user:
        NotificationService.create_notification(
            recipient=issue.created_by,
            notification_type='issue_updated',
            title=f'Issue Updated: {issue.title}',
            message=f'Your issue has been updated. Current status: {issue.get_status_display()}',
            related_object=issue
        )


def create_issue_resolved_notification(issue):
    """
    Create notification when an issue is resolved
    """
    from .services import NotificationService
    
    # Notify the issue creator
    NotificationService.create_notification(
        recipient=issue.created_by,
        notification_type='issue_resolved',
        title=f'Issue Resolved: {issue.title}',
        message=f'Your issue has been marked as resolved.',
        related_object=issue
    )