from django.urls import path, include
from rest_framework.routers import DefaultRouter

from backend.users import views
from backend.users.views import CheckPasswordView, VolunteerCourierViewSet, EnterpriseCourierViewSet

app_name = "users"


router = DefaultRouter()
router.register("volunteer_couriers", VolunteerCourierViewSet, basename="volunteer_couriers")
router.register("enterprise_couriers", EnterpriseCourierViewSet, basename="enterprise_couriers")


urlpatterns = [
    path("me/", view=views.UserAPIView.as_view(), name="user-me"),
    path("login/", view=views.UserLoginAPIView.as_view(), name="user-login"),
    path("volunteer-courier-register/", view=views.VolunteerCourierRegisterAPIView.as_view(), name="volunteer-reg"),
    path("enterprise-courier-register/", view=views.EnterpriseCourierRegisterAPIView.as_view(), name="enterprise-reg"),
    path("acc-admin-register/", view=views.ACCAdminRegisterAPIView.as_view(), name="acc-admin-reg"),
    path("adc-admin-register/", view=views.ADCAdminRegisterAPIView.as_view(), name="adc-admin-reg"),
    path("activate-user/", view=views.UserIsActiveAPIView.as_view(), name="activate-user"),
    path("logout/", view=views.UserLogoutAPIView.as_view(), name="user-logout"),
    path("profile/volunteer/", view=views.VolunteerCourierProfileAPIView.as_view(), name="volunteer-profile"),
    path("profile/enterprise/", view=views.EnterpriseCourierProfileAPIView.as_view(), name="enterprise-profile"),
    path('check-password/', CheckPasswordView.as_view(), name='check-password'),
    path('', include(router.urls)),

]



