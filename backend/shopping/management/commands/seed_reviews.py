import csv
import random
from django.core.management.base import BaseCommand
from shopping.models import Review, BamUser, ProductListing

class Command(BaseCommand):
    help = 'Seed the database with Reviews from a CSV file'

    def handle(self, *args, **kwargs):
        csv_file_path = 'shopping/management/seeder_csvs/reviews.csv'
        try:
            user_ids = list(BamUser.objects.values_list('id', flat=True))
            pl_ids = list(ProductListing.objects.values_list('id', flat=True))

            with open(csv_file_path, mode='r') as file:
                reader = csv.DictReader(file)

                for row in reader:
                  rating = row['rating']
                  title = row['title']
                  body = row['body']

                  r = Review(
                      user_id=random.choice(user_ids),
                      product_listing_id=random.choice(pl_ids),
                      rating=rating,
                      title=title,
                      body=body,
                  )
                  r.save()
                  self.stdout.write(self.style.SUCCESS(f'Review "{r.id}" created successfully'))

            self.stdout.write(self.style.SUCCESS('Successfully imported Reviews from CSV'))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'The file {csv_file_path} was not found'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
