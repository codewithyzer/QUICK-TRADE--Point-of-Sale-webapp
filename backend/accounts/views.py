from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status

from rest_framework.generics import ListCreateAPIView, CreateAPIView
from rest_framework.permissions import AllowAny

from .serializers import UserRegistrationSerializer

# Create your views here.
class UserRegisterListCreateAPIView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(is_active=False)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
