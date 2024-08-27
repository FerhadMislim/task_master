from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'is_completed', 'created', 'modified')
    list_filter = ('is_completed',)
    search_fields = ('title', 'description')
