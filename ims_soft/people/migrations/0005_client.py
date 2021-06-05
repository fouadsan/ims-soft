# Generated by Django 3.2.3 on 2021-05-30 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0004_alter_supplier_address'),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('phone', models.CharField(blank=True, max_length=13, null=True)),
                ('fax', models.CharField(blank=True, max_length=13, null=True)),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'ordering': ('-id',),
            },
        ),
    ]