from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class TimeCapsule(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField(blank=True, null=True)
    audio_file = models.FileField(upload_to='audio/', blank=True, null=True)
    image_file = models.ImageField(upload_to='images/', blank=True, null=True)
    video_file = models.FileField(upload_to='videos/', blank=True, null=True)
    open_date = models.DateTimeField()
    notification_token = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_opened = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Capsule by {self.user.username} - Opens on {self.open_date}"
