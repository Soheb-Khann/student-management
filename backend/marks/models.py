from django.db import models

from students.models import Student
from classes.models import Subject
from accounts.models import Teacher

# Created marks app to manage marks records for students in different subjects and exams. 


class MarkRecord(models.Model):

    EXAM_TYPES = (
        ("exam", "Exam"),
        ("assignment", "Assignment"),
        ("quiz", "Quiz"),
    )
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
    exam_type = models.CharField(max_length=50, choices=EXAM_TYPES, null=True, blank=True)


    marks_obtained = models.DecimalField( max_digits=5, decimal_places=2, null=True, blank=True)

    total_marks = models.DecimalField( max_digits=5, decimal_places=2, null=True, blank=True)

    semester = models.CharField( max_length=50, null=True, blank=True)

    remarks = models.TextField( blank=True, null=True)

    created_at = models.DateTimeField( auto_now_add=True)

    exam_date = models.DateField()

    def percentage(self):

        if not self.total_marks:
            return 0

        if not self.marks_obtained:
            return 0

        return (
            self.marks_obtained /
            self.total_marks
        ) * 100

    def __str__(self):
        return self.exam_name