from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Category, Cart, CartItem, Message, Conversation, Notification
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined']
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'  
    
class ProductSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset = Category.objects.all(),
        source='category',
        write_only=True
    )
    bought_by = serializers.PrimaryKeyRelatedField(
    queryset=User.objects.all(),
    allow_null=True,
    required=False
)
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['id', 'uploaded_at']
        
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset = Product.objects.all(),
        source='product',
        write_only=True
    )
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id']
        
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    class Meta:
        model = Cart
        fields = '__all__'
        read_only_fields = ['id', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'sender_username', 'text', 'timestamp']
        read_only_fields = ['sender']
        
class ConversationSerializer(serializers.ModelSerializer):
    buyer_username = serializers.CharField(source='buyer.username', read_only=True)
    seller_username = serializers.CharField(source='seller.username', read_only=True)
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ['id', 'buyer', 'buyer_username', 'seller', 'seller_username', 'created_at', 'messages']
        read_only_fields = ['buyer']
        
class NotificationSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='owner',
        write_only=True
    )
    class Meta:
        model = Notification
        fields = '__all__'
