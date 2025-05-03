from django.db import models
from django.contrib.auth.models import User

# Create your models here
class Category(models.Model):
    name = models.CharField(max_length=155, unique=True)
    
    def __str__(self):
        return self.name
    
class Product(models.Model):
    name = models.CharField(max_length=255, blank=False)
    uploaded_at = models.DateField(auto_now_add=True)
    in_stock = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rfs = models.TextField(blank=False)
    meetup_place_name = models.CharField(max_length=255, blank=True, null=True)
    meetup_lat = models.FloatField(null=True, blank=True)
    meetup_lng = models.FloatField(null=True, blank=True)
    
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='products'
    )
    
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='owned_products'
    )
    bought_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='purchased_products'
    )
    
    image = models.ImageField(upload_to='product_images/', default='product_images/No Product Image.svg')
    
    def __str__(self):
        return self.name
    
class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s Cart"
    

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['cart', 'product']  # Prevent duplicate products in same cart

    def __str__(self):
        return self.product.name