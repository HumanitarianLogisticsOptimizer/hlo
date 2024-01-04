from django.shortcuts import render
from rest_framework import viewsets

from backend.aid.models import ACCAid, ADCAid, ACC, ADC
from backend.aid.serializers import ACCAidSerializer, ADCAidSerializer, ACCSerializer, ADCSerializer


# Create your views here.

class ACCViewSet(viewsets.ModelViewSet):
    queryset = ACC.objects.all()
    serializer_class = ACCSerializer


class ADCViewSet(viewsets.ModelViewSet):
    queryset = ADC.objects.all()
    serializer_class = ADCSerializer


class ACCAidViewSet(viewsets.ModelViewSet):
    queryset = ACCAid.objects.all()
    serializer_class = ACCAidSerializer


class ADCAidViewSet(viewsets.ModelViewSet):
    queryset = ADCAid.objects.all()
    serializer_class = ADCAidSerializer
