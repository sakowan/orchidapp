# Generated by Django 5.0.7 on 2024-08-21 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0012_rename_img_url_product_main_img_product_application_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='desc_long',
            field=models.CharField(),
        ),
    ]
