from rest_framework import serializers
from .models import User, Course, Enrollment, IssueCategory, Issue, Comment, AuditLog, Notification

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
        fields = ['id',  'student_name', 'course', 'course_code', 'course_name', 
                 'semester', 'academic_year', 'current_grade']



class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_type = serializers.CharField(source='user.user_type', read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'issue', 'user', 'user_name', 'user_type', 'content', 'created_at', 'attachment']

class IssueSerializer(serializers.ModelSerializer):
    
    category_name = serializers.CharField(source='category', read_only=True)  # Free text category
    assigned_to_name = serializers.CharField(source='assigned_to.get_full_name', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Issue
        fields = ['id', 'title', 'description', 'category', 'category_name', 
                  'enrollment', 'current_grade', 'expected_grade',
                 'status', 'priority', 'assigned_to', 'assigned_to_name', 'created_at', 'updated_at', 
                 'resolved_at', 'attachments', 'comments']

    def create(self, validated_data):
    # Get the logged-in user (student) from request context
        user = self.context['request'].user
        
        # Remove student if it's in validated_data
        if 'student' in validated_data:
            validated_data.pop('student')
        
        issue = Issue.objects.create(**validated_data)
        return issue

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