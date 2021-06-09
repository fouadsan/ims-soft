# Generated by Django 3.2.3 on 2021-05-30 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
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
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('phone', models.CharField(blank=True, max_length=13, null=True)),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
                ('salary', models.PositiveIntegerField()),
                ('down_payments', models.PositiveIntegerField(blank=True, null=True)),
            ],
            options={
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='Supplier',
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
