from rest_framework import serializers

from backend.logistics.models import VolunteerTask, EnterpriseTask


class VolunteerTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerTask
        fields = "__all__"


class EnterpriseTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnterpriseTask
        fields = "__all__"
