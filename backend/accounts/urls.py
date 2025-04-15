from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegisterListCreateAPIView.as_view(), name='user_register')
]
