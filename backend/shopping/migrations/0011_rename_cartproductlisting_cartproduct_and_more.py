# Generated by Django 5.0.7 on 2024-08-21 05:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0010_review'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CartProductListing',
            new_name='CartProduct',
        ),
        migrations.RenameModel(
            old_name='ProductListing',
            new_name='Product',
        ),
        migrations.RenameField(
            model_name='review',
            old_name='product_listing',
            new_name='product',
        ),
    ]
