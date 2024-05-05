from django.db import models
from backend.aid.models import ACC, ADC
from backend.users.models import VolunteerCourier, EnterpriseCourier
import random


class VolunteerTask(models.Model):
    source = models.ForeignKey(
        ACC,
        on_delete=models.CASCADE,
        verbose_name="Collection Center"
    )
    target = models.ForeignKey(
        ADC,
        on_delete=models.CASCADE,
        verbose_name="Distribution Center"
    )
    load_type = models.CharField("Load Type", max_length=100)
    load_quantity = models.IntegerField("Load Quantity")
    owner = models.ForeignKey(
        VolunteerCourier,
        on_delete=models.CASCADE,
        verbose_name="Owner"
    )
    status = models.CharField("Status", max_length=100)
    source_code = models.CharField(max_length=6, editable=False, unique=True, verbose_name="Task Source Code")
    target_code = models.CharField(max_length=6, editable=False, unique=True, verbose_name="Task Target Code")

    def __str__(self):
        return f"Task from {self.source.name} to {self.target.name} by {self.owner.full_name}"

    def save(self, *args, **kwargs):
        # Generate source_code if it doesn't exist
        if not self.source_code:
            self.source_code = self._generate_unique_code('source_code')

        # Generate target_code if it doesn't exist
        if not self.target_code:
            self.target_code = self._generate_unique_code('target_code')

        super().save(*args, **kwargs)

    def _generate_unique_code(self, field_name):
        while True:
            code = ''.join(random.choices('0123456789', k=6))
            if not VolunteerTask.objects.filter(**{field_name: code}).exists():
                return code


class EnterpriseTask(models.Model):
    source = models.ForeignKey(
        ACC,
        on_delete=models.CASCADE,
        verbose_name="Collection Center"
    )
    target = models.ForeignKey(
        ADC,
        on_delete=models.CASCADE,
        verbose_name="Distribution Center"
    )
    load_type = models.CharField("Load Type", max_length=100)
    load_quantity = models.IntegerField("Load Quantity")
    owner = models.ForeignKey(
        EnterpriseCourier,
        on_delete=models.CASCADE,
        verbose_name="Owner"
    )
    status = models.CharField("Status", max_length=100)

    def __str__(self):
        return f"Task from {self.source.name} to {self.target.name} for {self.owner.company_name}"





