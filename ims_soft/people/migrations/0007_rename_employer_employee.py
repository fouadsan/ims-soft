# Generated by Django 3.2.3 on 2021-05-30 18:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0006_employer'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Employer',
            new_name='Employee',
        ),
    ]