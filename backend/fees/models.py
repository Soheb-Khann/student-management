from django.db import models

from students.models import Family


class FeeRecord(models.Model):

    family = models.ForeignKey(
        Family,
        on_delete=models.CASCADE,
        related_name='fee_records'
    )

    academic_year = models.CharField(max_length=20)

    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    due_date = models.DateField()

    notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def total_paid(self):

        return sum(
            payment.amount_paid
            for payment in self.payments.all()
        )

    def due_amount(self):

        return self.total_amount - self.total_paid()

    def __str__(self):
        return f"{self.family} - {self.academic_year}"


class FeePayment(models.Model):

    fee_record = models.ForeignKey(
        FeeRecord,
        on_delete=models.CASCADE,
        related_name='payments'
    )

    amount_paid = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    payment_date = models.DateField()

    payment_method = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    reference_number = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.amount_paid)