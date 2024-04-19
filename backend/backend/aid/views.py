from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from backend.aid.models import ACCAid, ADCAid, ACC, ADC, EMA, AidType, AidTypeRequest
from backend.aid.serializers import ACCAidSerializer, ADCAidSerializer, ACCSerializer, ADCSerializer, EMASerializer, \
    AidTypeSerializer, AidTypeRequestSerializer


# Create your views here.

class ACCViewSet(viewsets.ModelViewSet):
    queryset = ACC.objects.all()
    serializer_class = ACCSerializer
    filterset_fields = ['ema']
    permission_classes = (AllowAny,)


class ADCViewSet(viewsets.ModelViewSet):
    queryset = ADC.objects.all()
    serializer_class = ADCSerializer
    filterset_fields = ['ema']
    permission_classes = (AllowAny,)


class ACCAidViewSet(viewsets.ModelViewSet):
    queryset = ACCAid.objects.all()
    serializer_class = ACCAidSerializer
    filterset_fields = ['center']
    permission_classes = (AllowAny,)


class ADCAidViewSet(viewsets.ModelViewSet):
    queryset = ADCAid.objects.all()
    serializer_class = ADCAidSerializer
    filterset_fields = ['center']
    permission_classes = (AllowAny,)


class EMAViewSet(viewsets.ModelViewSet):
    queryset = EMA.objects.all()
    serializer_class = EMASerializer
    permission_classes = (AllowAny,)


class AidTypeViewSet(viewsets.ModelViewSet):
    queryset = AidType.objects.all()
    serializer_class = AidTypeSerializer
    permission_classes = (AllowAny,)


class AidTypeRequestViewSet(viewsets.ModelViewSet):
    queryset = AidTypeRequest.objects.all()
    serializer_class = AidTypeRequestSerializer
    permission_classes = (AllowAny,)
