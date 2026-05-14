from django.db import models

from students.models import Student
from classes.models import Subject
from accounts.models import Teacher

# Created feedback app to manage feedback records for students in different subjects and semesters. 


class Feedback(models.Model):

    SEMESTER_CHOICES = (
        ('semester_1', 'Semester 1'),
        ('semester_2', 'Semester 2'),
    )

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='feedbacks'
    )

    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.SET_NULL,
        null=True
    )

    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE
    )

    semester = models.CharField(
        max_length=20,
        choices=SEMESTER_CHOICES
    )

    comments = models.TextField()

    strengths = models.TextField(blank=True, null=True)

    improvements = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student} Feedback"