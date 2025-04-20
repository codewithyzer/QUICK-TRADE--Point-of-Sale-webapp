import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category__name', lookup_expr='exact')
    categories = django_filters.CharFilter(field_name='category__name', lookup_expr='in')
    exclude_user = django_filters.BooleanFilter(method='filter_exclude_user')
    owned_user = django_filters.BooleanFilter(method='filter_owned_user')
    
    class Meta:
        model = Product
        fields = ['category', 'categories', 'exclude_user', 'owned_user']
        
    def filter_exclude_user(self, queryset, name, value):
        if value:
            return queryset.exclude(owner=self.request.user)
        return queryset
    
    def filter_owned_user(self, queryset, name, value):
        if value:
            return queryset.filter(owner=self.request.user)
        return queryset