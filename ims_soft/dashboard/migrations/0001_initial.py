# Generated by Django 3.2.3 on 2021-06-16 17:14

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, validators=[django.core.validators.MinLengthValidator(limit_value=3, message='Name must be 3 characters at least')])),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('phone', models.CharField(blank=True, max_length=13, null=True)),
                ('address', models.CharField(blank=True, max_length=500, null=True)),
                ('web_url', models.URLField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'company',
                'verbose_name_plural': 'company',
            },
        ),
    ]
