from rest_framework import serializers

from .models import MarkRecord


class MarkRecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = MarkRecord
        fields = '__all__'