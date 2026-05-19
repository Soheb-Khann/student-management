from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import MarkRecord
from .serializers import MarkRecordSerializer

from classes.models import ClassAssignment


class MarkRecordViewSet(viewsets.ModelViewSet):

    serializer_class = MarkRecordSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        if user.role == 'admin':
            return MarkRecord.objects.all()

        elif user.role == 'teacher':

            teacher = user.teacher_profile

            return MarkRecord.objects.filter(
                teacher=teacher
            )

        elif user.role == 'parent':

            family = user.family_profile

            return MarkRecord.objects.filter(
                student__family=family
            )

        return MarkRecord.objects.none()

    def perform_create(self, serializer):

        teacher = None

        if self.request.user.role == 'teacher':
            teacher = self.request.user.teacher_profile

        serializer.save(teacher=teacher)

