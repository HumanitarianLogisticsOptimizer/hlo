from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from backend.users.managers import UserManager
from backend.aid.models import ACC, ADC


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        self.full_clean(exclude=["password"])
        self.set_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email


class VolunteerCourier(User):
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    car_plate_number = models.CharField(max_length=20)
    national_id_number = models.CharField(max_length=50)
    city = models.TextField()
    country = models.TextField()
    vehicle_size = models.TextField()

    class Meta:
        verbose_name = "Volunteer Courier"


class EnterpriseCourier(User):
    company_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    company_address = models.TextField()
    date_of_establishment = models.DateField()
    number_of_light_duty = models.IntegerField()
    number_of_medium_duty = models.IntegerField()
    number_of_heavy_duty = models.IntegerField()
    trade_registration_number = models.TextField()

    class Meta:
        verbose_name = "Enterprise Courier"


class ACCAdmin(User):
    center = models.ForeignKey(
        ACC,
        verbose_name="Collection Center",
        on_delete=models.CASCADE,
        related_name="admins"
    )

    class Meta:
        verbose_name = "ACC Admin"


class ADCAdmin(User):
    center = models.ForeignKey(
        ADC,
        verbose_name="Distribution Center",
        on_delete=models.CASCADE,
        related_name="admins"
    )

    class Meta:
        verbose_name = "ADC Admin"


class EMAAdmin(User):
    ema_name = models.CharField(max_length=255)

    class Meta:
        verbose_name = "EMA Admin"



