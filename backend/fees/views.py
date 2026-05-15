from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import FeeRecord
from .serializers import FeeRecordSerializer


class FeeRecordViewSet(viewsets.ModelViewSet):

    serializer_class = FeeRecordSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        if user.role == 'admin':
            return FeeRecord.objects.all()

        elif user.role == 'parent':

            family = user.family_profile

            return FeeRecord.objects.filter(
                family=family
            )

        return FeeRecord.objects.none()