from django.db import models
from backend.aid.models import ACC, ADC
from backend.users.models import VolunteerCourier, EnterpriseCourier


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

    def __str__(self):
        return f"Task from {self.destination.name} to {self.target.name} by {self.owner.full_name}"


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

    def __str__(self):
        return f"Task from {self.destination.name} to {self.target.name} for {self.owner.company_name}"





