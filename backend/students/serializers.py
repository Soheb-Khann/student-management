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

    family_name = serializers.CharField(
        source='family.father_name',
        read_only=True
    )

    school_class_name = serializers.CharField(
        source='school_class.name',
        read_only=True
    )

    class Meta:
        model = Student

        fields = [
            'id',
            'full_name',
            'arabic_name',
            'date_of_birth',
            'gender',
            'family',
            'family_name',
            'school_class',
            'school_class_name',
            'admission_date',
            'photo',
            'notes',
            'active',
        ]