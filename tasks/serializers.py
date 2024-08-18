from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    modified = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
                                        
    class Meta:
        model = Task
        fields = '__all__'
