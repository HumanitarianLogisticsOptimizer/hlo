from django.contrib import admin

from backend.users.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "is_staff",
        "is_superuser",
        "is_active",
        "last_login",
    )
