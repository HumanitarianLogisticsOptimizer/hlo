from django.contrib.auth import logout
from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.users.models import User, VolunteerCourier, EnterpriseCourier, ACCAdmin, ADCAdmin
from backend.users.serializers import UserLoginSerializer, \
    VolunteerCourierSerializer, EnterpriseCourierSerializer, \
    VolunteerCourierRegisterSerializer, EnterpriseCourierRegisterSerializer, ACCAdminRegisterSerializer, \
    ADCAdminRegisterSerializer, UserSerializer
from backend.users.utils import get_user_model_and_serializer


class UserAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        instance, serializer = get_user_model_and_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class VolunteerCourierRegisterAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        if VolunteerCourier.objects.filter(email=request.data["email"]).exists():
            return Response(
                data={"message": "User already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = VolunteerCourierRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        VolunteerCourier.objects.create_user(**serializer.validated_data)

        return Response(status=status.HTTP_201_CREATED)


class EnterpriseCourierRegisterAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        if EnterpriseCourier.objects.filter(email=request.data["email"]).exists():
            return Response(
                data={"message": "User already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = EnterpriseCourierRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        EnterpriseCourier.objects.create_user(**serializer.validated_data)

        return Response(status=status.HTTP_201_CREATED)


class ACCAdminRegisterAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        if ACCAdmin.objects.filter(email=request.data["email"]).exists():
            return Response(
                data={"message": "User already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ACCAdminRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ACCAdmin.objects.create_user(**serializer.validated_data)

        return Response(status=status.HTTP_201_CREATED)


class ADCAdminRegisterAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        if ADCAdmin.objects.filter(email=request.data["email"]).exists():
            return Response(
                data={"message": "User already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ADCAdminRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ADCAdmin.objects.create_user(**serializer.validated_data)

        return Response(status=status.HTTP_201_CREATED)


class UserLoginAPIView(APIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        if not serializer.is_valid():
            data = {"message": "Email address is not valid."}
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=request.data["email"])
            if user.check_password(request.data["password"]):
                from rest_framework.authtoken.models import Token

                token, created = Token.objects.get_or_create(user=user)
                return Response(data={"token": token.key}, status=status.HTTP_200_OK)
            return Response(
                data={"message": "Password is incorrect."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except User.DoesNotExist:
            return Response(
                data={"message": "User does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )


class UserLogoutAPIView(APIView):
    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        logout(request)
        return Response(data={"message": "User logged out."}, status=status.HTTP_200_OK)


class UserIsActiveAPIView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)  # Assuming only authenticated users can change isActive field

    def get_queryset(self):
        return User.objects.filter(is_active=False)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')  # Retrieve email from the request data

        if not email:
            # Email is not provided or empty
            return Response({"message": "Email address is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Attempt to find a user with the given email who is currently inactive
            user = User.objects.get(email=email, is_active=False)
        except User.DoesNotExist:
            # No inactive user found with the provided email
            return Response({"message": "User not found or already active."}, status=status.HTTP_404_NOT_FOUND)

        # Activate the user
        user.is_active = True
        user.save()

        # Return a success response
        return Response({"message": f"User {user.email} has been activated."}, status=status.HTTP_200_OK)
