# Generated by Django 3.2.3 on 2021-06-17 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='sub_total',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='sale',
            name='tax',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
    ]