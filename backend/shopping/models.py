from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.forms import ValidationError
from datetime import datetime, date, timedelta

# Signals
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.
class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Country(models.Model):
    name = models.CharField(max_length=50)
    COUNTRY_CHOICES = [
        ('MY', 'Malaysia'),
        ('JP', 'Japan'),
    ]
    country_code = models.CharField(max_length=2, choices=COUNTRY_CHOICES, default='JP')
    currency_code = models.CharField(max_length=3)
    calling_code = models.PositiveIntegerField()

    def __str__(self):
        return self.name #can add more desc later

class BamUser(AbstractUser):
    #Set email unique
    email = models.EmailField(unique=True)
    username = models.CharField(default=email, unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)
    phone = models.CharField(
        validators=[RegexValidator(
            regex= r'^\d+$',
            message='Phone field can only contain numbers.',
            code='invalid phone number'
        )])

class Cart(models.Model):
    user = models.OneToOneField(BamUser, on_delete=models.CASCADE, related_name='cart')
    item_count = models.PositiveIntegerField(default=0)

class Category(models.Model):
    TYPES = [
        (0, 'Unspecified'),
        (1, 'Skincare'),
        (2, 'Makeup'),
        (3, 'Beauty Tools'),
        (4, 'Hair products'),
    ]

    type = models.PositiveIntegerField(choices = TYPES)

    def __str__(self):
        for value, name in self.TYPES:
            if self.type == value:
                return name
        return 'Blank'  # If no matching type is found

class Product(models.Model):
    seller = models.ForeignKey(BamUser, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    url_name = models.CharField(max_length=150, blank=True, editable=False, unique=True)
    desc_brief = models.CharField(max_length=100)
    desc_long = models.CharField()
    price = models.DecimalField(max_digits=8, decimal_places=2, default = 0.00)
    stock = models.PositiveIntegerField()
    main_img = models.CharField(max_length=100)
    img_urls = models.JSONField(default=list)

    benefits = models.CharField(max_length=400)
    application = models.CharField(max_length=300)
    ingredients = models.CharField()

    def save(self, *args, **kwargs):
        # Set url_name based on name
        self.url_name = self.name.lower().replace(' ', '-')
        
        # Can only store <= 5 img urls
        if len(self.img_urls) > 5:
            raise ValueError("You can only store up to 5 image URLs.")
        
        super().save(*args, **kwargs)

class CartProduct(models.Model):
    #JOINS table
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    listing = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    class Meta:
        unique_together = ('listing', 'cart')


class ProductItemManager(models.Manager):
     def create(self, *args, **kwargs):
        expiry_date = kwargs.get('expiry_date')

        # Validate the expiry_date before creation
        if expiry_date <= date.today() + timedelta(days=30):
            raise ValidationError(f"expiry_date must > 30 days from today")
        
        return super().create(*args, **kwargs)

class ProductItem(models.Model):
    listing = models.ForeignKey(Product, on_delete=models.CASCADE)
    serial_number = models.CharField(max_length=100)
    expiry_date = models.DateField()

    # Set the custom manager
    objects = ProductItemManager()

class Address(models.Model):
    user = models.ForeignKey(BamUser, on_delete=models.CASCADE)
    post_code = models.CharField()
    prefecture = models.CharField()
    city = models.CharField()
    street = models.CharField()
    building_name = models.CharField()
    recipient_name = models.CharField()
    recipient_phone = models.CharField()

class Order(TimeStampedModel):
    STATUS_CHOICES = [
        (1, 'Placed'),
        (2, 'Shipped'),
        (3, 'Out for delivery'),
        (4, 'Delivered'),
        (5, 'Cancelled'),
    ]
    user = models.ForeignKey(BamUser, on_delete=models.CASCADE)
    address = models.OneToOneField('Address', on_delete=models.CASCADE)
    user_coupon = models.OneToOneField('BamUserCoupon',on_delete=models.CASCADE, null=True, blank=True)
    status = models.PositiveIntegerField(choices=STATUS_CHOICES)

class OrderProductItem(models.Model):
    #JOINS table
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_item = models.ForeignKey(ProductItem, on_delete=models.CASCADE) #not on cascade
    
    class Meta:
        unique_together = ('order', 'product_item')

class Coupon(TimeStampedModel):
    TYPES = [
        (1, 'Percentage'),
        (2, 'Price Off')
    ]
    code = models.CharField()
    type = models.CharField(choices = TYPES)
    amount = models.PositiveIntegerField()
    num_uses = models.PositiveIntegerField(default = 1)
    useby_datetime = models.DateTimeField()
    valid = models.BooleanField(default=True)

class BamUserCoupon(TimeStampedModel):
    #JOINS table
    user = models.ForeignKey(BamUser, on_delete=models.CASCADE)
    coupon = models.OneToOneField(Coupon,on_delete=models.CASCADE)
    times_used = models.PositiveIntegerField(default = 0)

    class Meta:
        unique_together = ('user', 'coupon')

class Complaint(TimeStampedModel):
    TYPES = [
        (1, 'Order Missing'),
        (2, 'Incomplete Order'),
        (3, 'Damaged/Defective'),
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    type = models.PositiveIntegerField(choices = TYPES)
    resolved = models.BooleanField(default=False)
    # status = models.PositiveIntegerField(choices = STATUSES)

class Review(TimeStampedModel):
    user = models.ForeignKey(BamUser, on_delete=models.CASCADE, related_name='reviews')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ])
    title = models.CharField(blank=True, null=True)
    body = models.CharField(blank=True, null=True)

    def clean(self):
        super().clean()
        if (self.title and not self.body) or (not self.title and self.body):
            raise ValidationError(f'Both title and body must be provided together.')

    def save(self, *args, **kwargs):
        self.full_clean()  # Calls the clean method and validates the title & body field must be present tgt
        super().save(*args, **kwargs)

@receiver(post_save, sender=BamUser)
def create_cart_for_user(sender, instance, created, **kwargs):
    if created:
        Cart.objects.create(user=instance)