from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Student, Lecturer


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    user_type = serializers.CharField(required=True)  # Add user_type to the serializer
    department = serializers.CharField(required=True) 
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name',
                 'last_name', 'user_type', 'phone_number', 'department']
        
    def create(self, validated_data):
        # Use create_user instead of create
        return User.objects.create_user(**validated_data)

class StudentRegistrationSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Student
        fields = ['user', 'student_id', 'program', 'year_of_study']
        
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['user_type'] = 'student'
        # Use create_user through the UserSerializer
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        student = Student.objects.create(user=user, **validated_data)
        return student

class LecturerRegistrationSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Lecturer
        fields = ['user', 'staff_id']
        
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['user_type'] = 'lecturer'
        # Use create_user through the UserSerializer
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        lecturer = Lecturer.objects.create(user=user, **validated_data)
        return lecturer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)
