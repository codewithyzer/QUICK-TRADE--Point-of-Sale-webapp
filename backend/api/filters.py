import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    categories = django_filters.CharFilter(field_name='category__name', lookup_expr='in')
    
    class Meta:
        model = Product
        fields = ['categories']