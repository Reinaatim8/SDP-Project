<<<<<<< HEAD
from rest_framework import viewsets, status, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers  # Add this import
import logging
=======
from rest_framework import viewsets, permissions, status, filters
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
<<<<<<< HEAD
=======
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
from .models import User, Course, Enrollment, IssueCategory, Issue, Comment, AuditLog, Notification
from .serializers import (
    UserSerializer, CourseSerializer, EnrollmentSerializer, 
    IssueCategorySerializer, IssueSerializer, CommentSerializer,
    AuditLogSerializer, NotificationSerializer
)
<<<<<<< HEAD
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Issue
from .serializers import IssueSerializer

class IssueListView(generics.ListAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Issue.objects.all()

        # Filter by student ID (issues reported by the logged-in student)
        if user.user_type == 'student':  # Use 'user_type' field for distinguishing user roles
            queryset = queryset.filter(student_id=user.id)
        
        # Filter by assigned lecturer (issues assigned to the lecturer or in their courses)
        elif user.user_type == 'lecturer':
            queryset = queryset.filter(course__lecturer=user) | queryset.filter(assigned_to=user)
        
        # Filter by status if provided
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        
        # Filter by course ID if provided
        course_id = self.request.query_params.get('course')
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        
        return queryset


class IssueDetailView(generics.RetrieveAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

=======

class IsStudentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'student'

class IsLecturerPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'lecturer'

class IsAdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'admin'
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email', 'first_name', 'last_name']
    authentication_classes = [TokenAuthentication, SessionAuthentication]
<<<<<<< HEAD
    
    def get_permissions(self):
        return []
    
    @action(detail=False, methods=['get'])
=======
    permission_classes = [permissions.IsAuthenticated]
    def get_permissions(self):
        if self.action in  ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated(), IsAdminPermission()]
    
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['course_code', 'course_name']
    
    def get_permissions(self):
<<<<<<< HEAD
        return []
    
    @action(detail=False, methods=['get'])
=======
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated(), IsAdminPermission()]
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated, IsLecturerPermission])
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
    def my_courses(self, request):
        courses = Course.objects.filter(lecturer=request.user)
        serializer = self.get_serializer(courses, many=True)
        return Response(serializer.data)

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    
    def get_permissions(self):
<<<<<<< HEAD
        return []
=======
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsAdminPermission()]
        return [permissions.IsAuthenticated()]
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
    
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
<<<<<<< HEAD
    permission_classes = [IsAuthenticated]  # Only authenticated users can access
    
    def get_queryset(self):
        # Remove the filtering based on 'is_public'
        return IssueCategory.objects.all()  # Now returns all categories, public or private
    
    def perform_create(self, serializer):
        serializer.save()
    
    def perform_update(self, serializer):
        instance = self.get_object()
        user = self.request.user
        if user.user_type == 'student':
            raise PermissionDenied("You can only update categories you've created.")
        serializer.save()
    
    def perform_destroy(self, instance):
        user = self.request.user
        if user.user_type == 'student':
            raise PermissionDenied("You can only delete categories you've created.")
        instance.delete()
    
    @action(detail=False, methods=['GET'])
    def my_categories(self, request):
        my_categories = IssueCategory.objects.all()  # No filter based on 'is_public'
        serializer = self.get_serializer(my_categories, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['POST'])
    def duplicate(self, request, pk=None):
        original_category = self.get_object()
        duplicate_data = self.get_serializer(original_category).data
        duplicate_data['id'] = None
        duplicate_data['name'] = f"Copy of {duplicate_data.get('name', 'Category')}"
        serializer = self.get_serializer(data=duplicate_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
=======
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsAdminPermission()]
        return [permissions.IsAuthenticated()]
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c

class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description', 'status']
<<<<<<< HEAD
    
    def get_permissions(self):
        return []
=======
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        #if self.action == 'create':
            #return [permissions.IsAuthenticated(), IsStudentPermission()]
        return [permissions.IsAuthenticated()]
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'student':
<<<<<<< HEAD
            return Issue.objects.filter(student_id=user.id)
=======
            return Issue.objects.filter(student=user)
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
        elif user.user_type == 'lecturer':
            return Issue.objects.filter(
                Q(course__lecturer=user) | Q(assigned_to=user)
            ).distinct()
        return Issue.objects.all()
    
    def perform_create(self, serializer):
<<<<<<< HEAD
        if self.request.user.user_type == 'student':
            serializer.save(student_id=self.request.user.id)  # Use student_id instead of student
        else:
            serializer.save()
        
        # Create notification for course lecturer
        issue = serializer.instance
=======
        issue = serializer.save(student=self.request.user)
        
        # Create notification for lecturer
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
        if issue.course.lecturer:
            Notification.objects.create(
                user=issue.course.lecturer,
                title="New Issue Reported",
<<<<<<< HEAD
                message=f"A new issue '{issue.title}' has been reported for your course {issue.course.course_code}",
                issue=issue
            )
    
    @action(detail=True, methods=['POST'])
    def assign(self, request, pk=None):
        issue = self.get_object()
        user_id = request.data.get('user_id')
        
        if not user_id:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            assigned_user = User.objects.get(id=user_id)
            previous_assigned = issue.assigned_to
            
            issue.assigned_to = assigned_user
            issue.save()
            
            # Log the change
            AuditLog.objects.create(
                issue=issue,
                user=request.user,
                action="Assigned issue",
                old_value=str(previous_assigned) if previous_assigned else "None",
                new_value=str(assigned_user)
            )
            
            # Notify the assigned user
            Notification.objects.create(
                user=assigned_user,
                title="Issue Assigned",
                message=f"You have been assigned to handle the issue '{issue.title}'",
                issue=issue
            )
            
            return Response({"success": f"Issue assigned to {assigned_user}"})
        
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['POST'])
=======
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
            
            return Response({"success": "Issue assigned successfully"})
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
    def change_status(self, request, pk=None):
        issue = self.get_object()
        new_status = request.data.get('status')
        
<<<<<<< HEAD
        if new_status not in dict(Issue.STATUS_CHOICES):
=======
        if new_status not in [choice[0] for choice in Issue.STATUS_CHOICES]:
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)
        
        old_status = issue.status
        issue.status = new_status
        
        if new_status == 'resolved':
            issue.resolved_at = timezone.now()
        
        issue.save()
        
<<<<<<< HEAD
        # Log the change
        AuditLog.objects.create(
            issue=issue,
            user=request.user,
            action="Changed status",
=======
        # Create audit log
        AuditLog.objects.create(
            issue=issue,
            user=request.user,
            action="Status changed",
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
            old_value=old_status,
            new_value=new_status
        )
        
<<<<<<< HEAD
        # Notify the student
        try:
            student = User.objects.get(id=issue.student)
            Notification.objects.create(
                user=student,
                title="Issue Status Updated",
                message=f"The status of your issue '{issue.title}' has been changed to {issue.get_status_display()}",
                issue=issue
            )
        except User.DoesNotExist:
            pass
        
        return Response({"success": f"Issue status changed to {new_status}"})




=======
        # Create notification for student
        Notification.objects.create(
            user=issue.student,
            title="Issue Status Updated",
            message=f"Your issue '{issue.title}' status has been updated to {issue.get_status_display()}",
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
        
        return Response({"success": "Status updated successfully"})
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def update_grade(self, request, pk=None):
        issue = self.get_object()
        new_grade = request.data.get('new_grade')
        
        if not new_grade:
            return Response({"error": "New grade is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            new_grade = float(new_grade)
        except ValueError:
            return Response({"error": "Invalid grade format"}, status=status.HTTP_400_BAD_REQUEST)
        
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
        
        return Response({"success": "Grade updated successfully"})
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    def get_permissions(self):
<<<<<<< HEAD
        return []
=======
        return [permissions.IsAuthenticated()]
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
    
    def get_queryset(self):
        issue_id = self.request.query_params.get('issue', None)
        if issue_id:
            return Comment.objects.filter(issue_id=issue_id)
<<<<<<< HEAD
=======
        
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
        user = self.request.user
        if user.user_type == 'student':
            return Comment.objects.filter(issue__student=user)
        elif user.user_type == 'lecturer':
            return Comment.objects.filter(
                Q(issue__course__lecturer=user) | Q(issue__assigned_to=user)
            ).distinct()
<<<<<<< HEAD
        return Comment.objects.all()

    def perform_create(self, serializer):
        comment = serializer.save(user=self.request.user)
        issue = comment.issue
=======
        
        return Comment.objects.all()
    
    def perform_create(self, serializer):
        comment = serializer.save(user=self.request.user)
        issue = comment.issue
        
        # Create notifications
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
        if self.request.user != issue.student:
            Notification.objects.create(
                user=issue.student,
                title="New Comment",
                message=f"New comment on your issue '{issue.title}'",
                issue=issue
            )
<<<<<<< HEAD
=======
        
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
        if issue.assigned_to and self.request.user != issue.assigned_to:
            Notification.objects.create(
                user=issue.assigned_to,
                title="New Comment",
                message=f"New comment on issue '{issue.title}' that you're assigned to",
                issue=issue
            )
<<<<<<< HEAD
=======
            
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
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
<<<<<<< HEAD
        return []
    
    def get_queryset(self):
        issue_id = self.request.query_params.get('issue', None)
        
        if issue_id:
            # Ensure the issue_id is a valid number before querying the database
            try:
                # Check if the issue exists by ID
                issue = Issue.objects.get(id=issue_id)
                # If the issue exists, filter the AuditLog by this Issue instance
                return AuditLog.objects.filter(issue=issue)
            except Issue.DoesNotExist:
                # Return an empty queryset if no issue is found with this ID
                return AuditLog.objects.none()
        
        # Default filtering based on user roles
=======
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        issue_id = self.request.query_params.get('issue', None)
        if issue_id:
            return AuditLog.objects.filter(issue_id=issue_id)
        
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
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
<<<<<<< HEAD
        return []
    
    def get_queryset(self):
        return Notification.objects.filter()
=======
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
        return Response({"success": "All notifications marked as read"})
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c
