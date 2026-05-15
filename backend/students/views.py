from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Student
from .serializers import StudentSerializer
from .permissions import StudentPermission

from classes.models import ClassAssignment
from accounts.models import Teacher


class StudentViewSet(viewsets.ModelViewSet):

    serializer_class = StudentSerializer
    permission_classes = [StudentPermission]

    def get_queryset(self):

        user = self.request.user

        # ADMIN
        if user.role == 'admin':
            return Student.objects.all()

        # TEACHER
        elif user.role == 'teacher':

            try:
                teacher = user.teacher_profile

                assigned_classes = ClassAssignment.objects.filter(
                    teacher=teacher
                ).values_list('school_class_id', flat=True)

                return Student.objects.filter(
                    school_class_id__in=assigned_classes
                ).distinct()

            except Teacher.DoesNotExist:
                return Student.objects.none()

        # PARENT
        elif user.role == 'parent':

            try:
                family = user.family_profile

                return Student.objects.filter(
                    family=family
                )

            except:
                return Student.objects.none()

        return Student.objects.none()