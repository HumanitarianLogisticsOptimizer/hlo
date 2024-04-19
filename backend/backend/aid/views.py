from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        type_id = serializer.validated_data['type'].id
        center_id = serializer.validated_data['center'].id
        quantity = serializer.validated_data['quantity']

        acc_aid, created = ACCAid.objects.get_or_create(
            type_id=type_id, center_id=center_id,
            defaults={'quantity': quantity}
        )

        if not created:
            acc_aid.quantity += quantity
            acc_aid.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ADCAidViewSet(viewsets.ModelViewSet):
    queryset = ADCAid.objects.all()
    serializer_class = ADCAidSerializer
    filterset_fields = ['center']
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        type_id = serializer.validated_data['type'].id
        center_id = serializer.validated_data['center'].id
        quantity = serializer.validated_data['quantity']

        adc_aid, created = ADCAid.objects.get_or_create(
            type_id=type_id, center_id=center_id,
            defaults={'quantity': quantity}
        )

        if not created:
            adc_aid.quantity += quantity
            adc_aid.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


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
