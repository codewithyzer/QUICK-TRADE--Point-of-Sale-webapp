from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Unregister the original User admin first
admin.site.unregister(User)

class PendingUserFilter(admin.SimpleListFilter):
    title = 'Activation Status'
    parameter_name = 'is_active'

    def lookups(self, request, model_admin):
        return (
            ('pending', 'Pending Approval'),
            ('active', 'Active'),
        )

    def queryset(self, request, queryset):
        if self.value() == 'pending':
            return queryset.filter(is_active=False)
        if self.value() == 'active':
            return queryset.filter(is_active=True)
        return queryset

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_filter = BaseUserAdmin.list_filter + (PendingUserFilter,)
    actions = ['activate_users']

    @admin.action(description="Activate selected users")
    def activate_users(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f"{updated} user(s) activated successfully.")
