from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Issue, Comment, Notification, AuditLog

@receiver(post_save, sender=Issue)
def issue_created_notification(sender, instance, created, **kwargs):
    """
    Signal to send notifications when a new issue is created
    """
    if created:
        # No need to duplicate notification logic here as it's handled in the view
        pass

@receiver(post_save, sender=Comment)
def comment_created_notification(sender, instance, created, **kwargs):
    """
    Signal to send email notifications when a comment is created
    """
    if created and settings.EMAIL_HOST:
        issue = instance.issue
        # Send email to student if comment is from lecturer or admin
        if instance.user != issue.student:
            try:
                send_mail(
                    subject=f"New Comment on Issue: {issue.title}",
                    message=f"A new comment has been added to your issue '{issue.title}' by {instance.user.get_full_name()}.\n\nComment: {instance.content}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[issue.student.email],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Email sending failed: {e}")
        
        # Send email to lecturer if comment is from student or admin
        if issue.course.lecturer and instance.user != issue.course.lecturer:
            try:
                send_mail(
                    subject=f"New Comment on Issue: {issue.title}",
                    message=f"A new comment has been added to an issue '{issue.title}' for your course {issue.course.course_code} by {instance.user.get_full_name()}.\n\nComment: {instance.content}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[issue.course.lecturer.email],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Email sending failed: {e}")

@receiver(pre_save, sender=Issue)
def track_issue_changes(sender, instance, **kwargs):
    """
    Signal to track changes to issues
    """
    if instance.pk:  # If this is an update, not a new instance
        try:
            old_instance = Issue.objects.get(pk=instance.pk)
            
            # Check for status change
            if old_instance.status != instance.status:
                # Audit log is created in the view
                pass
                
            # Check for grade change
            if old_instance.current_grade != instance.current_grade and instance.current_grade is not None:
                # Create audit log if not already created in the view
                # This serves as a backup in case grade is changed outside the API
                AuditLog.objects.create(
                    issue=instance,
                    user=instance.assigned_to if instance.assigned_to else instance.course.lecturer,
                    action="Grade updated (auto-tracked)",
                    old_value=str(old_instance.current_grade) if old_instance.current_grade else "None",
                    new_value=str(instance.current_grade)
                )
                
            # Check for priority change
            if old_instance.priority != instance.priority:
                AuditLog.objects.create(
                    issue=instance,
                    user=instance.assigned_to if instance.assigned_to else instance.course.lecturer,
                    action="Priority changed (auto-tracked)",
                    old_value=old_instance.get_priority_display(),
                    new_value=instance.get_priority_display()
                )
                
            # Check for assigned_to change
            if old_instance.assigned_to != instance.assigned_to:
                AuditLog.objects.create(
                    issue=instance,
                    user=instance.assigned_to if instance.assigned_to else instance.course.lecturer,
                    action="Assignment changed (auto-tracked)",
                    old_value=str(old_instance.assigned_to) if old_instance.assigned_to else "None",
                    new_value=str(instance.assigned_to) if instance.assigned_to else "None"
                )
                
        except Issue.DoesNotExist:
            # This is a new instance, so no need to check for changes
            pass