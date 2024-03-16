from rest_framework import serializers
from backend.users.models import User, VolunteerCourier, EnterpriseCourier, ACCAdmin, ADCAdmin


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email",)


class VolunteerCourierSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField(read_only=True)

    def get_user_type (self, object):
        return "volunteer_courier"

    class Meta:
        model = VolunteerCourier
        fields = ("user_type", "email", "full_name", "phone_number",
                  "car_plate_number", "national_id_number", "city",
                  "country", "vehicle_size", "availability")


class ACCAdminSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField(read_only=True)

    def get_user_type (self, object):
        return "acc_admin"

    class Meta:
        model = ACCAdmin
        fields = ("user_type", "email", "acc_name")


class ADCAdminSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField(read_only=True)

    def get_user_type (self, object):
        return "adc_admin"

    class Meta:
        model = ADCAdmin
        fields = ("user_type", "email", "adc_name")


class EnterpriseCourierSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField(read_only=True)

    def get_user_type (self, object):
        return "enterprise_courier"

    class Meta:
        model = EnterpriseCourier
        fields = ("user_type", "email", "company_name", "phone_number",
                  "company_address", "date_of_establishment", "number_of_light_duty",
                  "number_of_medium_duty", "number_of_heavy_duty",
                  "trade_registration_number", "trade_registration_number")


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class VolunteerCourierRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerCourier
        fields = ("email", "full_name", "password", "phone_number",
                  "car_plate_number", "national_id_number", "city",
                  "country", "vehicle_size")


class EnterpriseCourierRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnterpriseCourier
        fields = ("email", "company_name", "password", "phone_number",
                  "company_address", "date_of_establishment", "number_of_light_duty",
                  "number_of_medium_duty", "number_of_heavy_duty",
                  "trade_registration_number")


class ACCAdminRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ACCAdmin
        fields = ("email", "acc_name", "password")


class ADCAdminRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ADCAdmin
        fields = ("email", "adc_name", "password")






