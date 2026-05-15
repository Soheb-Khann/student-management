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