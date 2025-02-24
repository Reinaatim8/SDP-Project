from django.db import models

class Course(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=200)
    department = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'courses'

class Grade(models.Model):
    student = models.ForeignKey('authentication.Student', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    lecturer = models.ForeignKey('authentication.Lecturer', on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=5, decimal_places=2)
    semester = models.CharField(max_length=20)
    academic_year = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'grades'
        unique_together = ('student', 'course', 'semester', 'academic_year')

class Issue(models.Model):
    ISSUE_TYPES = (
        ('missing_grade', 'Missing Grade'),
        ('wrong_grade', 'Wrong Grade'),
        ('other', 'Other')
    )
    
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('rejected', 'Rejected')
    )
    
    student = models.ForeignKey('authentication.Student', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    lecturer = models.ForeignKey('authentication.Lecturer', on_delete=models.CASCADE)
    issue_type = models.CharField(max_length=20, choices=ISSUE_TYPES)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    expected_grade = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    evidence = models.FileField(upload_to='evidence/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    resolution_notes = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'issues'
