from rest_framework import serializers

from .models import Student, Family, ProgressRecord


class FamilySerializer(serializers.ModelSerializer):

    class Meta:
        model = Family
        fields = '__all__'


class ProgressRecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProgressRecord
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):

    family = FamilySerializer(read_only=True)

    school_class_name = serializers.CharField(
        source='school_class.name',
        read_only=True
    )

    class Meta:
        model = Student
        fields = '__all__'