from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from students.models import Student
from attendance.models import AttendanceRecord
from marks.models import MarkRecord
from fees.models import FeeRecord
from fees.serializers import FeeRecordSerializer

class CurrentUserView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)


class ParentDashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        if user.role != 'parent':
            return Response(
                {'error': 'Unauthorized'},
                status=403
            )

        family = user.family_profile

        students = Student.objects.filter(
            family=family
        )

        data = []

        for student in students:

            attendance_count = AttendanceRecord.objects.filter(
                student=student,
                status='present'
            ).count()

            marks_count = MarkRecord.objects.filter(
                student=student
            ).count()

            data.append({
                'student_name': student.full_name,
                'class': student.school_class.name,
                'attendance_count': attendance_count,
                'marks_count': marks_count,
            })

        fees = FeeRecord.objects.filter(
            family=family
        )

        return Response({
            'children': data,
            'fees': FeeRecordSerializer(fees, many=True).data
        })