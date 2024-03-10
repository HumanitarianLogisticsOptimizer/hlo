from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from backend.users.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

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
    availability = models.TextField()


class EnterpriseCourier(User):
    company_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    company_address = models.TextField()
    date_of_establishment = models.DateField()
    number_of_light_duty = models.IntegerField()
    number_of_medium_duty = models.IntegerField()
    number_of_heavy_duty = models.IntegerField()
    trade_registration_number = models.TextField()


class ACCAdmin(User):
    acc_name = models.CharField(max_length=255)


class ADCAdmin(User):
    adc_name = models.CharField(max_length=255)





