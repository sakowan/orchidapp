# yourapp/management/commands/seed_countries.py
from django.core.management.base import BaseCommand
from shopping.models import Country

class Command(BaseCommand):
    help = 'Seeds the database with Malaysia and Japan country data'

    def handle(self, *args, **kwargs):
        # Check if countries already exist to avoid duplicates
        if Country.objects.filter(country_code='MY').exists() and Country.objects.filter(country_code='JP').exists():
            self.stdout.write(self.style.SUCCESS('Countries already exist in the database.'))
            return

        # Create Malaysia
        malaysia = Country.objects.create(
            name='Malaysia',
            country_code='MY',
            currency_code='MYR',  # Malaysian Ringgit
            calling_code=60,  # Malaysia's calling code
        )
        self.stdout.write(self.style.SUCCESS(f'Successfully created country: {malaysia.name}'))

        # Create Japan
        japan = Country.objects.create(
            name='Japan',
            country_code='JP',
            currency_code='JPY',  # Japanese Yen
            calling_code=81,  # Japan's calling code
        )
        self.stdout.write(self.style.SUCCESS(f'Successfully created country: {japan.name}'))
