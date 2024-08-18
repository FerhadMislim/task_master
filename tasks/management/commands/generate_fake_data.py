# tasks/management/commands/generate_fake_data.py
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from faker import Faker
from tasks.models import Task

class Command(BaseCommand):
    help = 'Generate fake task data'

    def handle(self, *args, **kwargs):
        fake = Faker()
        
        # Create some users
        for _ in range(5):
            user = User.objects.create_user(
                username=fake.user_name(), 
                email=fake.email(),
                password='password123'
            )
            self.stdout.write(self.style.SUCCESS(f'Created user: {user.username}'))

            # Create tasks for each user
            for _ in range(10):
                Task.objects.create(
                    user=user,
                    title=fake.sentence(),
                    description=fake.text(),
                    is_completed=fake.boolean(),
                )
        self.stdout.write(self.style.SUCCESS('Successfully generated fake data.'))
