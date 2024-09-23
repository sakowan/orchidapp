# Generated by Django 5.0.6 on 2024-09-19 02:24

import shopping.helpers
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0022_country_flagimg'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='complaint',
            name='id',
        ),
        migrations.AddField(
            model_name='complaint',
            name='complaint_id',
            field=models.CharField(default=shopping.helpers.gen_random_string, max_length=12, primary_key=True, serialize=False, unique=True),
        ),
    ]
