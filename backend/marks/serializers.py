from rest_framework import serializers

from .models import MarkRecord


class MarkRecordSerializer(serializers.ModelSerializer):

    student_name = serializers.CharField(
        source='student.full_name',
        read_only=True
    )

    subject_name = serializers.CharField(
        source='subject.name',
        read_only=True
    )

    percentage = serializers.SerializerMethodField()

    class Meta:
        model = MarkRecord
        fields = '__all__'

    def get_percentage(self, obj):
        return obj.percentage()
        fields = '__all__'