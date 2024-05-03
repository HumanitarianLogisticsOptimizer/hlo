from rest_framework.routers import DefaultRouter

from backend.logistics.views import VolunteerTaskViewSet, EnterpriseTaskViewSet

app_name = "logistics"

router = DefaultRouter()
router.register("volunteer-tasks", VolunteerTaskViewSet, basename="volunteer_tasks")
router.register("enterprise-tasks", EnterpriseTaskViewSet, basename="enterprise-tasks")


urlpatterns = [

]

urlpatterns += router.urls
