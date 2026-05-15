from rest_framework import serializers
from .models import User, Teacher

# Added serializers for User and Teacher models to convert model instances to JSON format and vice versa.

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'role',
            'phone_number',
        ]


class TeacherSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Teacher
        fields = '__all__'