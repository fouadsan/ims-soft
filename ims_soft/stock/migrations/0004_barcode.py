# Generated by Django 3.2.3 on 2021-05-30 17:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '__first__'),
        ('dashboard', '0002_alter_company_options'),
        ('stock', '0003_productstock_reorder_level'),
    ]

    operations = [
        migrations.CreateModel(
            name='Barcode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('barcode_digit', models.CharField(blank=True, max_length=13, null=True)),
                ('barcode_img', models.ImageField(blank=True, upload_to='images/barcodes/')),
                ('company', models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.RESTRICT, to='dashboard.company')),
                ('product', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
            options={
                'ordering': ('-id',),
            },
        ),
    ]