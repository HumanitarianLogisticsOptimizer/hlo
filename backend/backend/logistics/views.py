from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from backend.logistics.models import VolunteerTask, EnterpriseTask
from backend.logistics.serializers import VolunteerTaskSerializer, EnterpriseTaskSerializer
from rest_framework.response import Response
from rest_framework.decorators import action


class VolunteerTaskViewSet(viewsets.ModelViewSet):
    queryset = VolunteerTask.objects.all()
    serializer_class = VolunteerTaskSerializer
    permission_classes = (AllowAny,)
    filterset_fields = ['source', 'target', 'owner']

    @action(detail=True, methods=['post'], url_path='verify-source-code')
    def verify_source_code(self, request, pk=None):
        task = self.get_object()
        code = request.data.get('code', None)
        if code and code == task.source_code:
            task.status = 'On the road'
            task.save()
            return Response({'status': 'verified', 'task_status': task.status}, status=status.HTTP_200_OK)
        return Response({'status': 'verification failed'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='verify-target-code')
    def verify_target_code(self, request, pk=None):
        task = self.get_object()
        code = request.data.get('code', None)
        if code and code == task.target_code:
            task.status = 'Done'
            task.save()
            return Response({'status': 'verified', 'task_status': task.status}, status=status.HTTP_200_OK)
        return Response({'status': 'verification failed'}, status=status.HTTP_400_BAD_REQUEST)


class EnterpriseTaskViewSet(viewsets.ModelViewSet):
    queryset = EnterpriseTask.objects.all()
    serializer_class = EnterpriseTaskSerializer
    permission_classes = (AllowAny,)
    filterset_fields = ['source', 'target', 'owner']

