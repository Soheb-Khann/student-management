from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Feedback
from .serializers import FeedbackSerializer


class FeedbackViewSet(viewsets.ModelViewSet):

    serializer_class = FeedbackSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        if user.role == 'admin':
            return Feedback.objects.all()

        elif user.role == 'teacher':

            teacher = user.teacher_profile

            return Feedback.objects.filter(
                teacher=teacher
            )

        elif user.role == 'parent':

            family = user.family_profile

            return Feedback.objects.filter(
                student__family=family
            )

        return Feedback.objects.none()