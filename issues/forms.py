from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser, Issue

# User Registration Form
class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'email', 'role', 'password']

# Issue Forms
class IssueForm(forms.ModelForm):
    class Meta:
        model = Issue
        fields = ['title', 'description', 'priority', 'status', 'assigned_to']