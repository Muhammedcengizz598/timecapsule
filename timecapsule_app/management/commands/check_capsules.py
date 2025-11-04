from django.core.management.base import BaseCommand
from django.utils import timezone
from timecapsule_app.models import TimeCapsule
import json

class Command(BaseCommand):
    help = 'Send notifications for time capsules that are due to be opened'

    def handle(self, *args, **options):
        now = timezone.now()
        due_capsules = TimeCapsule.objects.filter(
            open_date__lte=now,
            is_opened=False
        )
        
        for capsule in due_capsules:
            # Mark as opened
            capsule.is_opened = True
            capsule.save()
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'Capsule for {capsule.user.username} is now ready to open!'
                )
            )
