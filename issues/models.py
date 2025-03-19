from django.contrib.auth.models import AbstractUser
from django.db import models

# User Roles
class CustomUser(AbstractUser):
    # Define your custom fields here, if any
    role = models.CharField(max_length=50, blank=True, null=True)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Use a unique related_name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',  # Use a unique related_name
        blank=True
    )

    

# Issue Tracking Model
class Issue(models.Model):
    OPEN = 'open'
    CLOSED = 'closed'
    
    STATUS_CHOICES = [
        (OPEN, 'Open'),
        (CLOSED, 'Closed')
    ]
    
    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'
    
    PRIORITY_CHOICES = [
        (LOW, 'Low'),
        (MEDIUM, 'Medium'),
        (HIGH, 'High')
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    created_by = models.ForeignKey(CustomUser, on_delete=models.SET_DEFAULT, default=True)  
    assigned_to = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='issues_assigned')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default=OPEN)
    priority = models.CharField(max_length=50, choices=PRIORITY_CHOICES, default=MEDIUM)

    def __str__(self):
        return f"{self.title} ({self.status}) - Priority: {self.priority}"
