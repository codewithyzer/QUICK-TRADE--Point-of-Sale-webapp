from django.contrib import admin
from .models import Product, Category, Cart, CartItem, Conversation, Message

# Register your models here.
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Conversation)
admin.site.register(Message)