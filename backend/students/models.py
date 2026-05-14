from django.db import models
from django.conf import settings
from accounts.models import Teacher

# Created family model 

class Family(models.Model):

    parent_user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='family_profile',
        limit_choices_to={'role': 'parent'}
    )

    father_name = models.CharField(max_length=255)
    mother_name = models.CharField(max_length=255, blank=True, null=True)

    phone_number = models.CharField(max_length=20)

    alternate_phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    email = models.EmailField(blank=True, null=True)

    address = models.TextField()

    emergency_contact = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.father_name


from classes.models import SchoolClass

# Create student model to store information about students

class Student(models.Model):

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )

    full_name = models.CharField(max_length=255)

    arabic_name = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    date_of_birth = models.DateField()

    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)

    family = models.ForeignKey(
        Family,
        on_delete=models.CASCADE,
        related_name='students'
    )

    school_class = models.ForeignKey(
        SchoolClass,
        on_delete=models.SET_NULL,
        null=True,
        related_name='students'
    )

    admission_date = models.DateField()

    photo = models.ImageField(
        upload_to='student_photos/',
        blank=True,
        null=True
    )

    notes = models.TextField(blank=True, null=True)

    active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name


from classes.models import Subject

# Created progress report model to store information about students' progress in different subjects.

class ProgressRecord(models.Model):

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='progress_records'
    )

    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE
    )

    surah_completed = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    memorization_level = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    tajweed_level = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    notes = models.TextField(blank=True, null=True)

    updated_by = models.ForeignKey(
        Teacher,
        on_delete=models.SET_NULL,
        null=True
    )

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.student} - {self.subject}"