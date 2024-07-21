# Generated by Django 5.0.6 on 2024-07-21 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('country_code', models.CharField(choices=[('MY', 'Malaysia'), ('JP', 'Japan')], default='JP', max_length=2)),
                ('currency_code', models.CharField(max_length=3)),
                ('calling_code', models.PositiveIntegerField()),
            ],
        ),
    ]
