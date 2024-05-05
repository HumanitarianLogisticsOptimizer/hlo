from django.db import models
from backend.aid.models import ACC, ADC
from backend.users.models import VolunteerCourier, EnterpriseCourier
import random


class VolunteerTask(models.Model):
    destination = models.ForeignKey(
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
    done = models.BooleanField(default=False, verbose_name="Task Completed")
    code = models.CharField(max_length=6, editable=False, unique=True, verbose_name="Task Code")

    def __str__(self):
        return f"Task from {self.destination.name} to {self.target.name} by {self.owner.full_name}"

    def save(self, *args, **kwargs):
        if not self.code:
            # Generate a random 6-digit code
            self.code = ''.join(random.choices('0123456789', k=6))
        super().save(*args, **kwargs)


class EnterpriseTask(models.Model):
    destination = models.ForeignKey(
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
    done = models.BooleanField(default=False, verbose_name="Task Completed")

    def __str__(self):
        return f"Task from {self.destination.name} to {self.target.name} for {self.owner.company_name}"





