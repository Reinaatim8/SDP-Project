from django.shortcuts import render
from .models import Issue

def issue_list(request):
    issues = Issue.objects.all()
    return render(request, 'issues/issue_list.html', {'issues': issues})
# Create your views here.
