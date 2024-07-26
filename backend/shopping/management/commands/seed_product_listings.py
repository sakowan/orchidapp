import csv
from django.core.management.base import BaseCommand
from shopping.models import ProductListing, Category

class Command(BaseCommand):
    help = 'Seed the database with ProductListings from a CSV file'

    def handle(self, *args, **kwargs):
        csv_file_path = 'shopping/management/seeder_csvs/product_listings.csv'
        try:
            with open(csv_file_path, mode='r') as file:
                reader = csv.DictReader(file)

                for row in reader:
                    name = row['name']
                    description = row['description']
                    price = float(row['price'])
                    stock = int(row['stock'])
                    category_id = int(row['category'])

                    try:
                        category = Category.objects.get(id=category_id)
                    except Category.DoesNotExist:
                        self.stdout.write(self.style.ERROR(f'Category with ID {category_id} does not exist.'))
                        continue

                    ProductListing.objects.create(
                        name=name,
                        description=description,
                        price=price,
                        stock=stock,
                        category=category,
                        seller_id=1
                    )
                    self.stdout.write(self.style.SUCCESS(f'ProductListing "{name}" created successfully'))

            self.stdout.write(self.style.SUCCESS('Successfully imported ProductListings from CSV'))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'The file {csv_file_path} was not found'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
