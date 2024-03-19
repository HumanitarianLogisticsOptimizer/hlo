from django.urls import path

from backend.users import views

app_name = "users"

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
]



