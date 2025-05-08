from django.urls import path
from . import views

urlpatterns = [
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('logout/', views.logout),
    path('authenticated/', views.authenticated),
    path('products/', views.ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', views.ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-retrieve-update-destroy'),
    path('cart/', views.CartView.as_view(), name='cart-view'),
    path('conversations/', views.ConversationListCreateView.as_view(), name='conversation-list-create'),
    path('conversations/filter/', views.ConversationFilterView.as_view(), name='conversation-filter'),
    path('messages/', views.MessageCreateView.as_view(), name='send-message'),
    path('notifications/', views.NotificationListCreateAPIView.as_view(), name='notifications-lc'),
    path('notifications/<int:pk>/', views.NotificationRetrieveUpdateDestroyAPIView.as_view(), name='notifications-rud'),
    path('credentials/', views.CredentialListCreateAPIView.as_view(), name='credentials'),
    path('reports/', views.ReportListCreateAPIView.as_view(), name='reports')
]
