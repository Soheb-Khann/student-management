from rest_framework import serializers

from .models import StudentDocument


class StudentDocumentSerializer(
    serializers.ModelSerializer
):

    file_url = serializers.SerializerMethodField()

    class Meta:
        model = StudentDocument
        fields = '__all__'

    def get_file_url(self, obj):

        request = self.context.get('request')

        if obj.file and request:

            return request.build_absolute_uri(
                obj.file.url
            )

        return None