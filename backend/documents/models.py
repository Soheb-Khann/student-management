from django.db import models

from students.models import Student

# Created documents model to manage various documents related to students. 

class StudentDocument(models.Model):

    FILE_TYPE_CHOICES = (
        ('photo', 'Photo'),
        ('admission_form', 'Admission Form'),
        ('certificate', 'Certificate'),
        ('letter', 'Letter'),
        ('other', 'Other'),
    )

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='documents'
    )

    file_type = models.CharField(
        max_length=50,
        choices=FILE_TYPE_CHOICES
    )

    title = models.CharField(max_length=255)

    file = models.FileField(
        upload_to='student_documents/'
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    uploaded_by = models.ForeignKey(
        'accounts.User',
        on_delete=models.SET_NULL,
        null=True
    )

    def __str__(self):
        return self.title