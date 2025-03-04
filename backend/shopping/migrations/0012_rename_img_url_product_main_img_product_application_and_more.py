# Generated by Django 5.0.7 on 2024-08-21 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0011_rename_cartproductlisting_cartproduct_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='img_url',
            new_name='main_img',
        ),
        migrations.AddField(
            model_name='product',
            name='application',
            field=models.CharField(default='abc', max_length=300),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='benefits',
            field=models.CharField(default='abc', max_length=400),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='img_urls',
            field=models.JSONField(default=list),
        ),
        migrations.AddField(
            model_name='product',
            name='ingredients',
            field=models.CharField(default='abc'),
            preserve_default=False,
        ),
    ]
