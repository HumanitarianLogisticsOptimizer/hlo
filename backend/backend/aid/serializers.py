from rest_framework import serializers

from backend.aid.models import ACCAid, ADCAid, ACC, ADC, EMA, AidType, AidTypeRequest


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
        read_only_fields = ['demanded_stock']


class EMASerializer(serializers.ModelSerializer):
    class Meta:
        model = EMA
        fields = "__all__"


class AidTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AidType
        fields = "__all__"


class AidTypeRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AidTypeRequest
        fields = "__all__"
