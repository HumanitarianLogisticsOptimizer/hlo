from django.contrib import admin

from backend.aid.models import ACC, ADC, EMA, ACCAid, ADCAid
from backend.users.models import User, VolunteerCourier, EnterpriseCourier, ACCAdmin, ADCAdmin, EMAAdmin


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "is_active",
    )


@admin.register(VolunteerCourier)
class VolunteerCourier(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "is_active",
    )


@admin.register(EnterpriseCourier)
class EnterpriseCourier(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "is_active"
    )


@admin.register(ACCAdmin)
class ACCAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "is_active"
    )


@admin.register(ADCAdmin)
class ADCAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "is_active"
    )


@admin.register(EMAAdmin)
class EMAAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "is_active"
    )


@admin.register(ACC)
class ACC(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "ema"
    )


@admin.register(ADC)
class ADC(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "ema"
    )


@admin.register(EMA)
class EMA(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "country"
    )


@admin.register(ACCAid)
class ACCAid(admin.ModelAdmin):
    list_display = (
        "id",
        "type",
        "quantity",
        "center"
    )


@admin.register(ADCAid)
class ADCAid(admin.ModelAdmin):
    list_display = (
        "id",
        "type",
        "quantity",
        "standard_stock",
        "demanded_stock",
        "center"
    )
