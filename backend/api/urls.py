from django.urls import path
from . import views

urlpatterns = [
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('logout/', views.logout),
    path('authenticated/', views.authenticated),
    path('products/', views.ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', views.ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-retrieve-update-destroy')
]
