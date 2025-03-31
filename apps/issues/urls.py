from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework.authtoken.views import obtain_auth_token




router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'courses', views.CourseViewSet)
router.register(r'enrollments', views.EnrollmentViewSet)
router.register(r'categories', views.IssueCategoryViewSet)
router.register(r'issues', views.IssueViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'audit-logs', views.AuditLogViewSet)
router.register(r'notifications', views.NotificationViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', obtain_auth_token, name='api_token_auth'),
<<<<<<< HEAD
    path('issues/', views.IssueListView.as_view(), name='issue-list'),  # For listing issues
    path('issues/<int:id>/', views.IssueDetailView.as_view(), name='issue-detail'),
=======
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
    

    



    #path('', views.some_view, name='issues-home'),
]