from rest_framework.routers import DefaultRouter
from django.urls import path, include

from backend.aid.views import ACCAidViewSet, ADCAidViewSet, ACCViewSet, ADCViewSet, EMAViewSet, AidTypeViewSet, \
    ExportDataToExcel, OptimizationViewSet

app_name = "aid"

router = DefaultRouter()
router.register("accaids", ACCAidViewSet, basename="accaids")
router.register("adcaids", ADCAidViewSet, basename="adcaids")
router.register("acc", ACCViewSet, basename="acc")
router.register("adc", ADCViewSet, basename="adc")
router.register("ema", EMAViewSet, basename="ema")
router.register("aid_type", AidTypeViewSet, basename="aid_type")
router.register("aid_type_request", AidTypeViewSet, basename="aid_type_request")
router.register('optimization', OptimizationViewSet, basename='optimization')


urlpatterns = [
    path('export-excel/', ExportDataToExcel.as_view(), name='export-excel'),
]

urlpatterns += router.urls
