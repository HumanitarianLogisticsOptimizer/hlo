from django.shortcuts import render
from rest_framework import viewsets

from backend.aid.models import ACCAid, ADCAid, ACC, ADC, EMA
from backend.aid.serializers import ACCAidSerializer, ADCAidSerializer, ACCSerializer, ADCSerializer, EMASerializer


# Create your views here.

class ACCViewSet(viewsets.ModelViewSet):
    queryset = ACC.objects.all()
    serializer_class = ACCSerializer
    filterset_fields = ['ema']


class ADCViewSet(viewsets.ModelViewSet):
    queryset = ADC.objects.all()
    serializer_class = ADCSerializer
    filterset_fields = ['ema']


class ACCAidViewSet(viewsets.ModelViewSet):
    queryset = ACCAid.objects.all()
    serializer_class = ACCAidSerializer
    filterset_fields = ['center']


class ADCAidViewSet(viewsets.ModelViewSet):
    queryset = ADCAid.objects.all()
    serializer_class = ADCAidSerializer
    filterset_fields = ['center']


class EMAViewSet(viewsets.ModelViewSet):
    queryset = EMA.objects.all()
    serializer_class = EMASerializer


