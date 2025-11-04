from django.contrib import admin
from .models import TimeCapsule

@admin.register(TimeCapsule)
class TimeCapsuleAdmin(admin.ModelAdmin):
    list_display = ('user', 'open_date', 'created_at', 'is_opened')
    list_filter = ('is_opened', 'created_at', 'open_date')
    search_fields = ('user__username', 'message')
    date_hierarchy = 'created_at'
