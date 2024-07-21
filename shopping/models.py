from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.forms import ValidationError
from datetime import datetime, date, timedelta

# Create your models here.
class Country(models.Model):
    name = models.CharField(max_length=50)
    COUNTRY_CHOICES = [
        ('MY', 'Malaysia'),
        ('JP', 'Japan'),
    ]
    country_code = models.CharField(
        max_length=2,
        choices=COUNTRY_CHOICES,
        default='JP',
    )
    currency_code = models.CharField(max_length=3)
    calling_code = models.PositiveIntegerField()

    def __str__(self):
        return self.name #can add more desc later

class BamUser(AbstractUser):
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)
    phone = models.CharField(
        validators=[RegexValidator(
            regex= r'^\d+$',
            message='Phone field can only contain numbers.',
            code='invalid phone number'
        )])

class Cart(models.Model):
    user = models.OneToOneField(BamUser, on_delete=models.CASCADE)
    item_count = models.PositiveIntegerField(default=0)

class ProductListing(models.Model):
    seller = models.ForeignKey(BamUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    stock = models.PositiveIntegerField()

class CartProductListing(models.Model):
    #JOINS table
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    listing = models.ForeignKey(ProductListing, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('listing', 'cart')

class ProductItem(models.Model):
    listing = models.ForeignKey(ProductListing, on_delete=models.CASCADE)
    serial_number = models.CharField(max_length=100)
    expiry_date = models.DateField()

# class ProductItemManager(models.ProductItem):
#      def create(self, *args, **kwargs):
#         expiry_date = kwargs.get('expiry_date')

#         # Validate the expiry_date before creation
#         if expiry_date <= date.today() + timedelta(days=30):
#             raise ValidationError(f"expiry_date must >= 30 days from today")
        
#         return super().create(*args, **kwargs)