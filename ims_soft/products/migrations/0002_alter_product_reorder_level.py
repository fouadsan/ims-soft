# Generated by Django 3.2.3 on 2021-05-30 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='reorder_level',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
