from rest_framework import serializers
from backend.users.models import User, ACC, ADC, VolunteerCourier, EnterpriseCourier, ACCAdmin, ADCAdmin, EMAAdmin


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
                  "country", "vehicle_size")


class ACCAdminSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField(read_only=True)

    def get_user_type (self, object):
        return "acc_admin"

    class Meta:
        model = ACCAdmin
        fields = ("user_type", "email", "center")


class ADCAdminSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField(read_only=True)

    def get_user_type (self, object):
        return "adc_admin"

    class Meta:
        model = ADCAdmin
        fields = ("user_type", "email", "center")


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


class EMAAdminSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField(read_only=True)

    def get_user_type(self, object):
        return "ema_admin"

    class Meta:
        model = EMAAdmin
        fields = ("user_type", "email", "ema_name")


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
    center_id = serializers.IntegerField()

    class Meta:
        model = ACCAdmin
        fields = ('email', 'password', 'center_id')

    def create(self, validated_data):
        center_id = validated_data.pop('center_id')
        center = ACC.objects.get(id=center_id)
        user = ACCAdmin.objects.create_user(center=center, **validated_data)
        return user


class ADCAdminRegisterSerializer(serializers.ModelSerializer):
    center_id = serializers.IntegerField()

    class Meta:
        model = ADCAdmin
        fields = ('email', 'password', 'center_id')

    def create(self, validated_data):
        center_id = validated_data.pop('center_id')
        center = ADC.objects.get(id=center_id)
        user = ADCAdmin.objects.create_user(center=center, **validated_data)
        return user


class CheckPasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value





