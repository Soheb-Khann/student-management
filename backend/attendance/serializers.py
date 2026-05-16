from rest_framework import serializers

from .models import AttendanceSession, AttendanceRecord


class AttendanceRecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = AttendanceRecord
        fields = '__all__'


class AttendanceSessionSerializer(serializers.ModelSerializer):

    attendance_records = AttendanceRecordSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = AttendanceSession
        fields = '__all__'


class AttendanceSubmissionSerializer(serializers.Serializer):

    school_class = serializers.IntegerField()

    subject = serializers.IntegerField()

    date = serializers.DateField()

    attendance_records = serializers.ListField()