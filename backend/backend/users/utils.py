from django.http import Http404

from backend.users.models import VolunteerCourier, EnterpriseCourier, ACCAdmin, ADCAdmin
from backend.users.serializers import VolunteerCourierSerializer, EnterpriseCourierSerializer, ACCAdminSerializer, \
    ADCAdminSerializer


def get_user_model_and_serializer(user):
    # Try to find the user in each model
    try:
        instance = VolunteerCourier.objects.get(id=user.id)
        return instance, VolunteerCourierSerializer(instance)
    except VolunteerCourier.DoesNotExist:
        pass

    try:
        instance = EnterpriseCourier.objects.get(id=user.id)
        return instance, EnterpriseCourierSerializer(instance)
    except EnterpriseCourier.DoesNotExist:
        pass

    try:
        instance = ACCAdmin.objects.get(id=user.id)
        return instance, ACCAdminSerializer(instance)
    except ACCAdmin.DoesNotExist:
        pass

    try:
        instance = ADCAdmin.objects.get(id=user.id)
        return instance, ADCAdminSerializer(instance)
    except ADCAdmin.DoesNotExist:
        pass

    # If the user doesn't match any model
    raise Http404("User type not found.")
