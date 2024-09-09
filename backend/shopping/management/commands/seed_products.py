import csv
from django.core.management.base import BaseCommand
from shopping.models import Product, Category

class Command(BaseCommand):
    help = 'Seed the database with Products from a CSV file'

    def handle(self, *args, **kwargs):
        csv_file_path = 'shopping/management/seeder_csvs/product_listings.csv'
        try:
            with open(csv_file_path, mode='r') as file:
                reader = csv.DictReader(file)

                for row in reader:
                    name = row['name']
                    desc_brief = row['desc_brief']
                    price = float(row['price'])
                    stock = int(row['stock'])
                    category_id = int(row['category'])
                    main_img = row['main_img']
                    desc_long = row['desc_long']

                    try:
                        category = Category.objects.get(id=category_id)
                    except Category.DoesNotExist:
                        self.stdout.write(self.style.ERROR(f'Category with ID {category_id} does not exist.'))
                        continue

                    Product.objects.create(
                        name=name,
                        desc_brief=desc_brief,
                        price=price,
                        stock=stock,
                        category=category,
                        seller_id=1,
                        main_img=main_img,
                        desc_long=desc_long,
                    )
                    self.stdout.write(self.style.SUCCESS(f'Product "{name}" created successfully'))

            self.stdout.write(self.style.SUCCESS('Successfully imported Products from CSV'))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'The file {csv_file_path} was not found'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
