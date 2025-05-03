from django.shortcuts import render

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from rest_framework.response import Response
from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, ListAPIView
from rest_framework.views import APIView

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Product, Cart, CartItem, Conversation, Message
from .serializers import ProductSerializer, UserSerializer, CartSerializer, CartItemSerializer, ConversationSerializer, MessageSerializer
from .filters import ProductFilter

from rest_framework import serializers

# Create your views here.
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try: 
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']
            
            res = Response()
            res.data = {'success': True}
            
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            
            res.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            
            return res
        except:
            return Response({'success': False})
        
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if not refresh_token:
                return Response({'refresh': False}, status=400)

            serializer = TokenRefreshSerializer(data={'refresh': refresh_token})
            serializer.is_valid(raise_exception=True)
            access_token = serializer.validated_data['access']

            res = Response({'refreshed': True})
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res
        except Exception as e:
            print("Refresh error:", e)
            return Response({'refresh': False}, status=400)


@api_view(['POST'])
def logout(request):
    try:
        res = Response()
        res.data = {'success': True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        return res
    except:
        return Response({'success': False})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def authenticated(request):
    serializer = UserSerializer(request.user)
    return Response({'authenticated': True, 'user': serializer.data})

class ProductListCreateAPIView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        
class ProductRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter
    
class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get("product_id")
        if not product_id:
            return Response({"error": "Product ID is required"}, status=400)

        product = Product.objects.filter(id=product_id).first()
        if not product:
            return Response({"error": "Product not found"}, status=404)

        cart, _ = Cart.objects.get_or_create(user=request.user)
        if CartItem.objects.filter(cart=cart, product=product).exists():
            return Response({"error": "Product already in cart"}, status=400)

        CartItem.objects.create(cart=cart, product=product)
        return Response({"message": "Product added to cart"}, status=201)

    def delete(self, request):
        product_id = request.data.get("product_id")
        cart = Cart.objects.filter(user=request.user).first()
        if not cart:
            return Response({"error": "Cart not found"}, status=404)

        item = CartItem.objects.filter(cart=cart, product_id=product_id).first()
        if not item:
            return Response({"error": "Item not found in cart"}, status=404)

        item.delete()
        return Response({"message": "Product removed from cart"}, status=200)
    
class ConversationListCreateView(ListCreateAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Conversation.objects.filter(buyer=user) | Conversation.objects.filter(seller=user)

    def perform_create(self, serializer):
        buyer = self.request.user
        seller = self.request.data.get('seller')

        # prevent duplicate conversation
        if Conversation.objects.filter(buyer=buyer, seller_id=seller).exists() or \
           Conversation.objects.filter(buyer_id=seller, seller=buyer).exists():
            raise serializers.ValidationError("Conversation already exists.")

        serializer.save(buyer=buyer)
        
class MessageCreateView(CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
        
class ConversationFilterView(ListAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        buyer_id = self.request.query_params.get('buyer')
        seller_id = self.request.query_params.get('seller')

        if buyer_id and seller_id:
            return Conversation.objects.filter(
                buyer_id=buyer_id,
                seller_id=seller_id
            ) | Conversation.objects.filter(
                buyer_id=seller_id,
                seller_id=buyer_id
            )
        return Conversation.objects.none()