from rest_framework import serializers

from backend.aid.models import ACCAid, ADCAid, ACC, ADC


class ACCSerializer(serializers.ModelSerializer):
    class Meta:
        model = ACC
        fields = "__all__"


class ADCSerializer(serializers.ModelSerializer):
    class Meta:
        model = ADC
        fields = "__all__"


class ACCAidSerializer(serializers.ModelSerializer):
    class Meta:
        model = ACCAid
        fields = "__all__"


class ADCAidSerializer(serializers.ModelSerializer):
    class Meta:
        model = ADCAid
        fields = "__all__"
