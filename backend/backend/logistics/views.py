from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from backend.logistics.models import VolunteerTask, EnterpriseTask
from backend.logistics.serializers import VolunteerTaskSerializer, EnterpriseTaskSerializer


class VolunteerTaskViewSet(viewsets.ModelViewSet):
    queryset = VolunteerTask.objects.all()
    serializer_class = VolunteerTaskSerializer
    permission_classes = (AllowAny,)
    filterset_fields = ['source', 'target', 'owner']


class EnterpriseTaskViewSet(viewsets.ModelViewSet):
    queryset = EnterpriseTask.objects.all()
    serializer_class = EnterpriseTaskSerializer
    permission_classes = (AllowAny,)
    filterset_fields = ['source', 'target', 'owner']

