# tasks/models.py
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel

class Task(TimeStampedModel):
    user = models.ForeignKey(User, related_name='tasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
