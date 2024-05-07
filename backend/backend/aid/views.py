from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import os
from django.conf import settings
from rest_framework.viewsets import ViewSet

from backend.aid.models import ACCAid, ADCAid, ACC, ADC, EMA, AidType, AidTypeRequest
from backend.aid.serializers import ACCAidSerializer, ADCAidSerializer, ACCSerializer, ADCSerializer, EMASerializer, \
    AidTypeSerializer, AidTypeRequestSerializer
from backend.logistics.optimization import mip_setup, mip_solve
from backend.utils.export import export_models_to_excel
from backend.utils.task_allocation import allocate_and_create_tasks
import pandas as pd


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


class ExportDataToExcel(APIView):
    permission_classes = (AllowAny,)  # or IsAdminUser if you prefer

    def get(self, request):
        app_name = 'aid'
        model_names = ['ACC', 'ADC', 'ACCAid', 'ADCAid']
        excel_directory = os.path.join(settings.MEDIA_ROOT, 'inputs')

        if not os.path.exists(excel_directory):
            os.makedirs(excel_directory)

        excel_file_path = os.path.join(excel_directory, 'inputs_to_load.xlsx')

        export_models_to_excel(app_name, model_names, excel_file_path)

        return Response({"message": f"Excel file created at {excel_file_path}"})


class OptimizationViewSet(ViewSet):
    """
    A ViewSet for running optimization processes and then allocating tasks based on the results.
    """
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def run(self, request):
        try:
            # Specify the absolute path to your inputs file
            inputs_directory = '/app/backend/media/inputs/inputs_to_load.xlsx'
            outputs_directory = '/app/backend/media/outputs/results.xlsx'  # Assume results are saved here

            # Read user inputs
            inputs_dict = mip_setup.read_inputs(inputs_directory)
            mip_inputs = mip_setup.InputsSetup(inputs_dict)

            # Run optimization
            mip_solve.mathematical_model_solve(mip_inputs)

            # Assuming results are saved to outputs_directory, load them
            df = pd.read_excel(outputs_directory, sheet_name='x_ijk_results')
            allocate_and_create_tasks(df)

            return Response({'message': 'Optimization and task allocation successfully completed!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
