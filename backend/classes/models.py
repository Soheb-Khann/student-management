from django.db import models

# Created class and subject models to store class and subject

class SchoolClass(models.Model):

    name = models.CharField(max_length=100)

    academic_year = models.CharField(max_length=20)

    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Subject(models.Model):

    name = models.CharField(max_length=100)

    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

from accounts.models import Teacher

# Created class assignment model to assign teachers to classes and subjects

class ClassAssignment(models.Model):

    school_class = models.ForeignKey(
        SchoolClass,
        on_delete=models.CASCADE,
        related_name='assignments'
    )

    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.CASCADE,
        related_name='assignments'
    )

    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name='assignments'
    )

    description = models.TextField(blank=True, null=True)
    assigned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('school_class', 'teacher', 'subject')

    def __str__(self):
        return f"{self.teacher} - {self.school_class} - {self.subject}"