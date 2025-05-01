from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Category, Cart, CartItem
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