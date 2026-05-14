from django.contrib.auth.models import AbstractUser
from django.db import models

# Create custom User model 

class User(AbstractUser):

    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('parent', 'Parent'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    phone_number = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.username} - {self.role}"


# Create Teacher model to store information about teachers

class Teacher(models.Model):

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='teacher_profile',
        limit_choices_to={'role': 'teacher'}
    )

    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)

    qualification = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    joining_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.user.get_full_name()