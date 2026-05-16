from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from students.models import Student

from .models import (
    AttendanceSession,
    AttendanceRecord,
)

from .serializers import (
    AttendanceSubmissionSerializer, AttendanceSessionSerializer
)

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

class SubmitAttendanceView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = AttendanceSubmissionSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        data = serializer.validated_data

        teacher = request.user.teacher_profile

        attendance_session = AttendanceSession.objects.create(
            school_class_id=data['school_class'],
            subject_id=data['subject'],
            teacher=teacher,
            date=data['date'],
        )

        for item in data['attendance_records']:

            AttendanceRecord.objects.create(
                session=attendance_session,
                student_id=item['student_id'],
                status=item['status'],
            )

        return Response(
            {'message': 'Attendance submitted'},
            status=status.HTTP_201_CREATED
        )