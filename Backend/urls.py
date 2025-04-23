from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework.authtoken.views import obtain_auth_token


router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename="users")
router.register(r'courses', views.CourseViewSet, basename="courses")
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
    path('', views.some_view, name='issues-home'),
]
