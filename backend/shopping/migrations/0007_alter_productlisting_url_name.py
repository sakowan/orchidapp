# Generated by Django 5.0.7 on 2024-08-17 05:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0006_alter_productlisting_url_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productlisting',
            name='url_name',
            field=models.CharField(blank=True, editable=False, max_length=150, unique=True),
        ),
    ]
