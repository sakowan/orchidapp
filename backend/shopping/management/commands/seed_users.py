from django.core.management.base import BaseCommand
from shopping.models import BamUser
from django.contrib.auth.models import Permission
from django.utils.crypto import get_random_string
from django.db import IntegrityError

class Command(BaseCommand):
    help = 'Seed users for BamUser'

    def handle(self, *args, **kwargs):
        try:
            # First user (superuser Bella)
            superuser = BamUser.objects.create_user(
                email='bella@gmail.com',
                username='bella',
                password='bella',
                country=None,  # Optional: set country if needed
                phone='1234567890',
            )
            superuser.is_superuser = True
            superuser.is_staff = True
            superuser.save()

            # Second user (Normal user)
            user2 = BamUser.objects.create_user(
                email='sarah@gmail.com',
                username='sarah',
                password='sarah',
                country=None,  # Optional: set country if needed
                phone='9876543210',
            )

            # Third user (Normal user)
            user3 = BamUser.objects.create_user(
                email='adam@gmail.com',
                username='adam',
                password='adam',
                country=None,  # Optional: set country if needed
                phone='1122334455',
            )

            self.stdout.write(self.style.SUCCESS('Successfully seeded 3 users!'))

        except IntegrityError as e:
            self.stdout.write(self.style.ERROR(f'Error seeding users: {e}'))