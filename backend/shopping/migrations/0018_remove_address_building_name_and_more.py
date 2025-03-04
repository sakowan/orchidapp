# Generated by Django 5.0.6 on 2024-09-10 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0017_cartproduct_created_at_cartproduct_updated_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='address',
            name='building_name',
        ),
        migrations.RemoveField(
            model_name='address',
            name='recipient_name',
        ),
        migrations.RemoveField(
            model_name='address',
            name='recipient_phone',
        ),
        migrations.AddField(
            model_name='address',
            name='building',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='address',
            name='contact',
            field=models.CharField(default='070 1234 5678', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='address',
            name='country',
            field=models.CharField(default='Japan', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='address',
            name='first_name',
            field=models.CharField(default='Sarah', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='address',
            name='last_name',
            field=models.CharField(default='Koay', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='email',
            field=models.EmailField(default='sarah@gmail.com', max_length=254),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='num_products',
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='payment_method_id',
            field=models.CharField(default='abc', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='shipping_fee',
            field=models.DecimalField(decimal_places=2, default=300, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='shipping_type',
            field=models.CharField(default='express_shipping', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='subtotal',
            field=models.DecimalField(decimal_places=2, default=2500, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='total',
            field=models.DecimalField(decimal_places=2, default=2800, max_digits=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='address',
            name='city',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='address',
            name='post_code',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='address',
            name='prefecture',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='address',
            name='street',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.PositiveIntegerField(choices=[(0, 'Unpaid'), (1, 'Paid'), (2, 'Shipped'), (3, 'Out for delivery'), (4, 'Delivered'), (5, 'Cancelled')]),
        ),
    ]
