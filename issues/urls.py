from django.urls import path
from . import views
from .views import notifications_view

urlpatterns = [
    path('', views.issue_list, name='issue_list'),
    path('<int:issue_id>/', views.issue_detail, name='issue_detail'),
    path('create/', views.create_issue, name='create_issue'),
    path('notifications/', notifications_view, name='notifications'),
    ]