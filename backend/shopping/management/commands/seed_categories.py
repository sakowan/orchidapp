from django.core.management.base import BaseCommand
from shopping.models import Category

class Command(BaseCommand):
    help = 'Seed the database with predefined categories'

    def handle(self, *args, **kwargs):
        categories = [
            {'type': 1, 'name': 'Skincare'},
            {'type': 2, 'name': 'Makeup'},
            {'type': 3, 'name': 'Beauty Tools'},
            {'type': 4, 'name': 'Hair products'},
        ]

        for category in categories:
            # Create the category if it does not already exist
            obj, created = Category.objects.get_or_create(
                type=category['type'],
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Category "{obj.__str__()}" created successfully'))
            else:
                self.stdout.write(self.style.WARNING(f'Category "{obj.__str__()}" already exists'))

        self.stdout.write(self.style.SUCCESS('Successfully seeded categories'))
