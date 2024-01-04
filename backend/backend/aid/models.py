from django.db import models


class ACC(models.Model):
    name = models.CharField("Name", max_length=100)
    address = models.CharField("Address", max_length=100)
    location = models.CharField("Location", max_length=100)

    class Meta:
        verbose_name = "Aid Collection Center"

    def __str__(self):
        return self.name


class ADC(models.Model):
    name = models.CharField("Name", max_length=100)
    address = models.CharField("Address", max_length=100)
    location = models.CharField("Location", max_length=100)

    class Meta:
        verbose_name = "Aid Distribution Center"

    def __str__(self):
        return self.name


class ACCAid(models.Model):
    type = models.CharField("Type", max_length=50)
    quantity = models.IntegerField("Quantity")
    center = models.ForeignKey(
        ACC,
        verbose_name="Collection Center",
        on_delete=models.CASCADE,
        related_name="aids"
    )

    def __str__(self):
        return f"{self.type} - {self.quantity} units at {self.center}"


class ADCAid(models.Model):
    type = models.CharField("Type", max_length=50)
    quantity = models.IntegerField("Quantity")
    center = models.ForeignKey(
        ADC,
        verbose_name="Distribution Center",
        on_delete=models.CASCADE,
        related_name="aids"
    )

    def __str__(self):
        return f"{self.type} - {self.quantity} units at {self.center}"

