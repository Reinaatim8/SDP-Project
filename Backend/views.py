from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from .models import User, Course, Enrollment, IssueCategory, Issue, Comment, AuditLog, Notification
from .serializers import (
    UserSerializer, CourseSerializer, EnrollmentSerializer, 
    IssueCategorySerializer, IssueSerializer, CommentSerializer,
    AuditLogSerializer, NotificationSerializer
)

class IsStudentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'student'

class IsLecturerPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'lecturer'

class IsAdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'admin'

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email', 'first_name', 'last_name']
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def get_permissions(self):
        if self.action in  ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated(), IsAdminPermission()]
    
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['course_code', 'course_name']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated(), IsAdminPermission()]
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated, IsLecturerPermission])
    def my_courses(self, request):
        courses = Course.objects.filter(lecturer=request.user)
        serializer = self.get_serializer(courses, many=True)
        return Response(serializer.data)

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsAdminPermission()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'student':
            return Enrollment.objects.filter(student=user)
        elif user.user_type == 'lecturer':
            return Enrollment.objects.filter(course__lecturer=user)
        return Enrollment.objects.all()

class IssueCategoryViewSet(viewsets.ModelViewSet):
    queryset = IssueCategory.objects.all()
    serializer_class = IssueCategorySerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsAdminPermission()]
        return [permissions.IsAuthenticated()]

class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description', 'status']
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        #if self.action == 'create':
            #return [permissions.IsAuthenticated(), IsStudentPermission()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'student':
            return Issue.objects.filter(student=user)
        elif user.user_type == 'lecturer':
            return Issue.objects.filter(
                Q(course__lecturer=user) | Q(assigned_to=user)
            ).distinct()
        return Issue.objects.all()
    
    def perform_create(self, serializer):
        issue = serializer.save(student=self.request.user)
        
        # Create notification for lecturer
        if issue.course.lecturer:
            Notification.objects.create(
                user=issue.course.lecturer,
                title="New Issue Reported",
                message=f"A new issue '{issue.title}' has been reported for {issue.course.course_code}",
                issue=issue
            )
        
        # Create notification for admin
        admin_users = User.objects.filter(user_type='admin')
        for admin in admin_users:
            Notification.objects.create(
                user=admin,
                title="New Issue Reported",
                message=f"A new issue '{issue.title}' has been reported by {issue.student.get_full_name()}",
                issue=issue
            )
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def assign(self, request, pk=None):
        issue = self.get_object()
        assigned_to_id = request.data.get('assigned_to')
        
        try:
            assigned_to = User.objects.get(id=assigned_to_id)
            if assigned_to.user_type not in ['lecturer', 'admin']:
                return Response({"error": "Can only assign to lecturers or admins"}, status=status.HTTP_400_BAD_REQUEST)
            
            old_assigned = issue.assigned_to
            issue.assigned_to = assigned_to
            issue.save()
            
            # Create audit log
            AuditLog.objects.create(
                issue=issue,
                user=request.user,
                action="Issue assigned",
                old_value=str(old_assigned) if old_assigned else "None",
                new_value=str(assigned_to)
            )
            
            # Create notification
            Notification.objects.create(
                user=assigned_to,
                title="Issue Assigned",
                message=f"You have been assigned to issue '{issue.title}'",
                issue=issue
            )
            
            return Response({"success": "Issue assigned successfully  "})
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def change_status(self, request, pk=None):
        issue = self.get_object()
        new_status = request.data.get('status')
        
        if new_status not in [choice[0] for choice in Issue.STATUS_CHOICES]:
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)
        
        old_status = issue.status
        issue.status = new_status
        
        if new_status == 'resolved':
            issue.resolved_at = timezone.now()
        
        issue.save()
        
        # Create audit log
        AuditLog.objects.create(
            issue=issue,
            user=request.user,
            action="Status changed",
            old_value=old_status,
            new_value=new_status
        )
        
        # Create notification for student
        Notification.objects.create(
            user=issue.student,
            title="Issue Status Updated",
            message=f"Your issue '{issue.title}' status has been updated  to {issue.get_status_display()}",
            issue=issue
        )
        
        # Send email notification
        if settings.EMAIL_HOST:
            try:
                send_mail(
                    subject=f"Issue Status Update: {issue.title}",
                    message=f"Your issue '{issue.title}' status has been updated to {issue.get_status_display()}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[issue.student.email],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Email sending failed: {e}")
        
        return Response({"success": "Update successfull"})
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def update_grade(self, request, pk=None):
        issue = self.get_object()
        new_grade = request.data.get('new_grade')
        
        if not new_grade:
            return Response({"error": "New grade is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            new_grade = float(new_grade)
        except ValueError:
            return Response({"error": "Invalid grade format please try again"}, status=status.HTTP_400_BAD_REQUEST)
        
        old_grade = issue.current_grade
        issue.current_grade = new_grade
        issue.save()
        
        # Update enrollment grade if it exists
        if issue.enrollment:
            issue.enrollment.current_grade = new_grade
            issue.enrollment.save()
        
        # Create audit log
        AuditLog.objects.create(
            issue=issue,
            user=request.user,
            action="Grade updated",
            old_value=str(old_grade) if old_grade else "None",
            new_value=str(new_grade)
        )
        
        # Create notification for student
        Notification.objects.create(
            user=issue.student,
            title="Grade Updated",
            message=f"Your grade for {issue.course.course_code} has been updated to {new_grade}",
            issue=issue
        )
        
        return Response({"success": "Update successfull"})

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    def get_permissions(self):
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        issue_id = self.request.query_params.get('issue', None)
        if issue_id:
            return Comment.objects.filter(issue_id=issue_id)
        
        user = self.request.user
        if user.user_type == 'student':
            return Comment.objects.filter(issue__student=user)
        elif user.user_type == 'lecturer':
            return Comment.objects.filter(
                Q(issue__course__lecturer=user) | Q(issue__assigned_to=user)
            ).distinct()
        
        return Comment.objects.all()
    
    def perform_create(self, serializer):
        comment = serializer.save(user=self.request.user)
        issue = comment.issue
        
        # Create notifications
        if self.request.user != issue.student:
            Notification.objects.create(
                user=issue.student,
                title="New Comment",
                message=f"New comment on your issue '{issue.title}'",
                issue=issue
            )
        
        if issue.assigned_to and self.request.user != issue.assigned_to:
            Notification.objects.create(
                user=issue.assigned_to,
                title="New Comment",
                message=f"New comment on issue '{issue.title}' that you're assigned to",
                issue=issue
            )
            
        if issue.course.lecturer and self.request.user != issue.course.lecturer:
            Notification.objects.create(
                user=issue.course.lecturer,
                title="New Comment",
                message=f"New comment on issue '{issue.title}' for your course {issue.course.course_code}",
                issue=issue
            )

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    
    def get_permissions(self):
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        issue_id = self.request.query_params.get('issue', None)
        if issue_id:
            return AuditLog.objects.filter(issue_id=issue_id)
        
        user = self.request.user
        if user.user_type == 'student':
            return AuditLog.objects.filter(issue__student=user)
        elif user.user_type == 'lecturer':
            return AuditLog.objects.filter(
                Q(issue__course__lecturer=user) | Q(issue__assigned_to=user)
            ).distinct()
        
        return AuditLog.objects.all()

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    
    def get_permissions(self):
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')
    
    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return Response({"success": "Notification marked as read"})
    
    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
        return Response({"success": " 12345notifications marked as add read "})