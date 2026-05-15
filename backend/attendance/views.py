from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import AttendanceSession
from .serializers import AttendanceSessionSerializer

from classes.models import ClassAssignment


class AttendanceSessionViewSet(viewsets.ModelViewSet):

    serializer_class = AttendanceSessionSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        # ADMIN
        if user.role == 'admin':
            return AttendanceSession.objects.all()

        # TEACHER
        elif user.role == 'teacher':

            teacher = user.teacher_profile

            assigned_classes = ClassAssignment.objects.filter(
                teacher=teacher
            ).values_list('school_class_id', flat=True)

            return AttendanceSession.objects.filter(
                school_class_id__in=assigned_classes
            )

        # PARENT
        elif user.role == 'parent':

            family = user.family_profile

            student_ids = family.students.values_list(
                'id',
                flat=True
            )

            return AttendanceSession.objects.filter(
                attendance_records__student_id__in=student_ids
            ).distinct()

        return AttendanceSession.objects.none()