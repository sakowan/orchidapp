from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

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