from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone
from django.db import models
class User(AbstractUser):
    """
    Extended User model to handle different user types in the system.
    """
    USER_TYPE_CHOICES = [
        ('student', 'Student'),
        ('lecturer', 'Lecturer'),
        ('admin', 'Administrator'),
    ]
    
    
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    
    groups = models.ManyToManyField(Group, related_name="issues_users")
    user_permissions = models.ManyToManyField(Permission, related_name="issues_user_permissions")
    
    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"

class Course(models.Model):
    """
    Model to represent academic courses in the system.
    """
    course_code = models.CharField(max_length=10, unique=True)
    course_name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    lecturer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='taught_courses', 
                                limit_choices_to={'user_type': 'lecturer'})
    
    def __str__(self):
        return f"{self.course_code}: {self.course_name}"

class Enrollment(models.Model):
    """
    Model to represent student enrollment in courses.
    """
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments', 
                              limit_choices_to={'user_type': 'student'})
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    semester = models.CharField(max_length=20)
    academic_year = models.CharField(max_length=9)  # Format: 2023/2024
    current_grade = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    class Meta:
        unique_together = ['student', 'course', 'semester', 'academic_year']
    
    def __str__(self):
        return f"{self.student.username} - {self.course.course_code} ({self.semester}, {self.academic_year})"

class IssueCategory(models.Model):
    """
    Model to categorize different types of academic issues.
    """
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Issue Categories"
class Issue(models.Model):
    """
    Model to track academic issues reported by students.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('rejected', 'Rejected'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    student_id = models.IntegerField()  # Now stores student ID as an integer

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_issues')
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(IssueCategory, on_delete=models.CASCADE, related_name='issues')
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name='enrollment_issues',
                                  null=True, blank=True)
    
    current_grade = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    expected_grade = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, 
                                  related_name='assigned_issues')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    
    attachments = models.FileField(upload_to='issue_attachments/', null=True, blank=True)
    
    def __str__(self):
        return f"{self.title} - {self.get_status_display()}"
    
    def resolve(self):
        """Method to mark an issue as resolved"""
        self.status = 'resolved'
        self.resolved_at = timezone.now()
        self.save()

class Comment(models.Model):
    """
    Model to track comments and updates on issues.
    """
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    attachment = models.FileField(upload_to='comment_attachments/', null=True, blank=True)
    
    def __str__(self):
        return f"Comment by {self.user.username} on {self.issue.title}"

class AuditLog(models.Model):
    """
    Model to maintain a transparent log of all grade changes.
    """
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='audit_logs')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_actions')
    action = models.CharField(max_length=255)
    old_value = models.CharField(max_length=255, null=True, blank=True)
    new_value = models.CharField(max_length=255, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.action} by {self.user.username} on {self.timestamp}"

class Notification(models.Model):
    """
    Model to handle system notifications for users.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=100)
    message = models.TextField()
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='issue_notifications', null=True, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Notification for {self.user.username}: {self.title}"
