from rest_framework import serializers
from .models import User, Course, Enrollment, IssueCategory, Issue, Comment, AuditLog, Notification
<<<<<<< HEAD
from django.db.models import Q
from django.contrib.auth import get_user_model

User = get_user_model()
=======
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'user_type', 'phone_number']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

class CourseSerializer(serializers.ModelSerializer):
    lecturer_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = ['id', 'course_code', 'course_name', 'description', 'lecturer', 'lecturer_name']
    
    def get_lecturer_name(self, obj):
        if obj.lecturer:
            return f"{obj.lecturer.first_name} {obj.lecturer.last_name}"
        return None

class EnrollmentSerializer(serializers.ModelSerializer):
    course_code = serializers.CharField(source='course.course_code', read_only=True)
    course_name = serializers.CharField(source='course.course_name', read_only=True)
    student_name = serializers.CharField(source='student.get_full_name', read_only=True)
    
    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'student_name', 'course', 'course_code', 'course_name', 
                 'semester', 'academic_year', 'current_grade']

class IssueCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueCategory
<<<<<<< HEAD
        fields = ['name', 'description']
=======
        fields = ['id', 'name', 'description']
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c

class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_type = serializers.CharField(source='user.user_type', read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'issue', 'user', 'user_name', 'user_type', 'content', 'created_at', 'attachment']

class IssueSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    student_name = serializers.SerializerMethodField()
    course_code = serializers.CharField(source='course.course_code', read_only=True)
    course_name = serializers.CharField(source='course.course_name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    assigned_to_name = serializers.SerializerMethodField()
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    priority_display = serializers.CharField(source='get_priority_display', read_only=True)
    
    class Meta:
        model = Issue
        fields = ['id', 'student_id', 'student_name', 'course', 'course_code', 'course_name',
                 'title', 'description', 'category', 'category_name', 'enrollment',
                 'current_grade', 'expected_grade', 'status', 'status_display',
                 'priority', 'priority_display', 'assigned_to', 'assigned_to_name',
                 'created_at', 'updated_at', 'resolved_at', 'attachments']
    
    def get_student_name(self, obj):
        try:
            student = User.objects.get(id=obj.student_id)
            return f"{student.first_name} {student.last_name}"
        except User.DoesNotExist:
            return None
    
    def get_assigned_to_name(self, obj):
        if obj.assigned_to:
            return f"{obj.assigned_to.first_name} {obj.assigned_to.last_name}"
        return None

=======
    student_name = serializers.CharField(source='student.get_full_name', read_only=True)
    course_code = serializers.CharField(source='course.course_code', read_only=True)
    course_name = serializers.CharField(source='course.course_name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.get_full_name', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Issue
        fields = ['id', 'title', 'description', 'category', 'category_name', 'student', 'student_name', 
                 'course', 'course_code', 'course_name', 'enrollment', 'current_grade', 'expected_grade',
                 'status', 'priority', 'assigned_to', 'assigned_to_name', 'created_at', 'updated_at', 
                 'resolved_at', 'attachments', 'comments']
>>>>>>> 5588129722b9f7f541cc7e5f166a5668b9b5790c

class AuditLogSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    issue_title = serializers.CharField(source='issue.title', read_only=True)
    
    class Meta:
        model = AuditLog
        fields = ['id', 'issue', 'issue_title', 'user', 'user_name', 'action', 'old_value', 'new_value', 'timestamp']

class NotificationSerializer(serializers.ModelSerializer):
    issue_title = serializers.CharField(source='issue.title', read_only=True, allow_null=True)
    
    class Meta:
        model = Notification
        fields = ['id', 'user', 'title', 'message', 'issue', 'issue_title', 'is_read', 'created_at']