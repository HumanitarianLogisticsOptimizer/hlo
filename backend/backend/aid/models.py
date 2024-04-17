from django.db import models


class EMA(models.Model):
    name = models.CharField("Name", max_length=100)
    country = models.CharField("Country", max_length=100)
    address = models.CharField("Address", max_length=100)
    location = models.CharField("Location", max_length=100)

    class Meta:
        verbose_name = "Emergency Management Authority"

    def __str__(self):
        return self.name


class ACC(models.Model):
    name = models.CharField("Name", max_length=100)
    address = models.CharField("Address", max_length=100)
    location = models.CharField("Location", max_length=100)
    ema = models.ForeignKey(
        EMA,
        verbose_name="Emergency Management Authority",
        on_delete=models.CASCADE,  # Decide the behavior when an EMA is deleted
        related_name="acc_centers"
    )

    class Meta:
        verbose_name = "Aid Collection Center"

    def __str__(self):
        return f"{self.name} - Managed by {self.ema}"


class ADC(models.Model):
    name = models.CharField("Name", max_length=100)
    address = models.CharField("Address", max_length=100)
    location = models.CharField("Location", max_length=100)
    ema = models.ForeignKey(
        EMA,
        verbose_name="Emergency Management Authority",
        on_delete=models.CASCADE,  # Decide the behavior when an EMA is deleted
        related_name="adc_centers"
    )

    class Meta:
        verbose_name = "Aid Distribution Center"

    def __str__(self):
        return f"{self.name} - Managed by {self.ema}"


class AidType(models.Model):
    name = models.CharField("Name", max_length=100)

    class Meta:
        verbose_name = "Aid Type"

    def __str__(self):
        return self.name


class ACCAid(models.Model):
    type = models.ForeignKey(AidType, verbose_name="Aid Type", on_delete=models.SET_NULL, related_name="acc_aids",
                             null=True)
    quantity = models.IntegerField("Quantity")
    center = models.ForeignKey(
        ACC,
        verbose_name="Collection Center",
        on_delete=models.CASCADE,
        related_name="aids"
    )

    class Meta:
        verbose_name = "ACC Aid"

    def __str__(self):
        return f"{self.type} - {self.quantity} units at {self.center}"


class ADCAid(models.Model):
    type = models.ForeignKey(AidType, verbose_name="Aid Type", on_delete=models.SET_NULL, related_name="adc_aids",
                             null=True)
    quantity = models.IntegerField("Quantity")
    standard_stock = models.IntegerField("Standard Stock")
    demanded_stock = models.IntegerField("Demanded Stock")
    center = models.ForeignKey(
        ADC,
        verbose_name="Distribution Center",
        on_delete=models.CASCADE,
        related_name="aids"
    )

    class Meta:
        verbose_name = "ADC Aid"

    def save(self, *args, **kwargs):
        # If quantity is less than or equal to half of standard_stock, set demanded_stock accordingly
        if self.quantity <= self.standard_stock / 2:
            self.demanded_stock = self.quantity + self.standard_stock
        else:
            # Otherwise, set demanded_stock to 0
            self.demanded_stock = 0

        super(ADCAid, self).save(*args, **kwargs)  # Call the "real" save() method

    def __str__(self):
        return f"{self.type} - {self.quantity} units at {self.center}"

