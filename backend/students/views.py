from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):

    serializer_class = StudentSerializer

    permission_classes = [IsAuthenticated]

    queryset = Student.objects.all()
