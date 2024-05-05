from rest_framework.routers import DefaultRouter

from backend.logistics.views import VolunteerTaskViewSet, EnterpriseTaskViewSet

app_name = "logistics"

router = DefaultRouter()
router.register("volunteer_tasks", VolunteerTaskViewSet, basename="volunteer_tasks")
router.register("enterprise_tasks", EnterpriseTaskViewSet, basename="enterprise_tasks")


urlpatterns = [

]

urlpatterns += router.urls
