from django.db import IntegrityError, models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.forms import ValidationError
from datetime import datetime, date, timedelta
from .helpers import gen_random_string

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
    flagImg = models.ImageField()

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
    price = models.PositiveIntegerField(default = 0)
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

class CartProduct(TimeStampedModel):
    #JOINS table
    user = models.ForeignKey(BamUser, on_delete=models.CASCADE, related_name="cart_products")
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="cart_products")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="cart_products")
    quantity = models.PositiveIntegerField()

    class Meta:
        unique_together = ('product', 'cart')


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
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    post_code = models.CharField(max_length=20)
    prefecture = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=100)
    building = models.CharField(max_length=50, null=True, blank=True)
    contact = models.CharField(max_length=20)

class Order(TimeStampedModel):
    STATUS_CHOICES = [
        (0, 'Unpaid'),
        (1, 'Paid'),
        (2, 'Shipped'),
        (3, 'Out for delivery'),
        (4, 'Delivered'),
        (5, 'Cancelled'),
    ]
    user = models.ForeignKey(BamUser, on_delete=models.CASCADE)

    email = models.EmailField()
    address = models.OneToOneField('Address', on_delete=models.CASCADE)
    num_products = models.PositiveIntegerField()
    payment_method_id = models.CharField(max_length=100)
    shipping_type = models.CharField(max_length=100)
    shipping_fee = models.PositiveIntegerField()
    subtotal = models.PositiveIntegerField()
    total = models.PositiveIntegerField()
    
    user_coupon = models.OneToOneField('BamUserCoupon',on_delete=models.CASCADE, null=True, blank=True)
    status = models.PositiveIntegerField(choices=STATUS_CHOICES)

class OrderProduct(TimeStampedModel):
    #JOINS table
    user = models.ForeignKey(BamUser, on_delete=models.CASCADE, related_name="order_products")
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_products")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="order_products") #To number of units sold on product view page
    quantity = models.PositiveIntegerField()
    
    class Meta:
        unique_together = ('order', 'product')

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
    id = models.CharField(max_length=12, default=gen_random_string, unique=True, primary_key=True)
    user = models.ForeignKey(BamUser, on_delete=models.CASCADE, related_name='complaints')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='complaints')
    resolved = models.BooleanField(default=False)
    
    STATUSES = [
        (0, 'Unassigned'),
        (1, 'In Progress'),
        (2, 'Resolved'),
    ]
    status = models.PositiveIntegerField(choices = STATUSES, default=0)

    def save(self, *args, **kwargs):
        while True:
            try:
                super().save(*args, **kwargs)
                break
            except IntegrityError:
                # Generate a new random string and try to save again
                self.id = gen_random_string()

class ComplaintOrderProduct(TimeStampedModel):
    #JOINS table
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE)
    order_product = models.ForeignKey(OrderProduct, on_delete=models.CASCADE)

    title = models.CharField(blank=True, null=True)
    body = models.CharField(blank=True, null=True)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('complaint', 'order_product')

class ComplaintOPImage(TimeStampedModel):
    complaint_order_product = models.ForeignKey(ComplaintOrderProduct, on_delete=models.CASCADE, related_name='complaint_op_images')
    image = models.ImageField()  # Use the callable function

    # def save(self, *args, **kwargs):
    #     # Validate the number of images attached to the complaint
    #     if self.complaint_order_product.complaint_op_images.count() >= 3:
    #         raise ValidationError("You can only upload up to 3 images per complaint.")
        
    #     # Call the parent class's save method
    #     super().save(*args, **kwargs)

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