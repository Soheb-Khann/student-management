from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import StudentDocument

from .serializers import (
    StudentDocumentSerializer
)


class StudentDocumentViewSet(
    viewsets.ModelViewSet
):

    serializer_class = StudentDocumentSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        queryset = StudentDocument.objects.all()

        student_id = self.request.query_params.get(
            'student'
        )

        if student_id:

            queryset = queryset.filter(
                student_id=student_id
            )

        return queryset

    def perform_create(self, serializer):

        serializer.save(
            uploaded_by=self.request.user
        )