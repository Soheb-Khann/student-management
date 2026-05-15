from rest_framework import serializers

from .models import FeeRecord, FeePayment


class FeePaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = FeePayment
        fields = '__all__'


class FeeRecordSerializer(serializers.ModelSerializer):

    payments = FeePaymentSerializer(
        many=True,
        read_only=True
    )

    total_paid = serializers.SerializerMethodField()

    due_amount = serializers.SerializerMethodField()

    class Meta:
        model = FeeRecord
        fields = '__all__'

    def get_total_paid(self, obj):
        return obj.total_paid()

    def get_due_amount(self, obj):
        return obj.due_amount()