from rest_framework.routers import DefaultRouter

from backend.aid.views import ACCAidViewSet, ADCAidViewSet, ACCViewSet, ADCViewSet, EMAViewSet, AidTypeViewSet

app_name = "aid"

router = DefaultRouter()
router.register("accaids", ACCAidViewSet, basename="accaids")
router.register("adcaids", ADCAidViewSet, basename="adcaids")
router.register("acc", ACCViewSet, basename="acc")
router.register("adc", ADCViewSet, basename="adc")
router.register("ema", EMAViewSet, basename="ema")
router.register("aid_type", AidTypeViewSet, basename="aid_type")
router.register("aid_type_request", AidTypeViewSet, basename="aid_type_request")

urlpatterns = [

]

urlpatterns += router.urls
