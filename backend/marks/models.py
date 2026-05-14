from django.db import models

from students.models import Student
from classes.models import Subject
from accounts.models import Teacher

# Created marks app to manage marks records for students in different subjects and exams. 


class MarkRecord(models.Model):

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='marks'
    )

    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE
    )

    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.SET_NULL,
        null=True
    )

    exam_name = models.CharField(max_length=255)

    total_marks = models.PositiveIntegerField(default=100)

    obtained_marks = models.PositiveIntegerField()

    exam_date = models.DateField()

    remarks = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student} - {self.subject}"