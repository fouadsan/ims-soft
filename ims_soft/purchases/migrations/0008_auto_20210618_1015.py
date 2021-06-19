# Generated by Django 3.2.3 on 2021-06-18 09:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('purchases', '0007_merge_20210618_1015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchase',
            name='grand_total',
            field=models.PositiveIntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='purchase',
            name='left_to_pay',
            field=models.PositiveIntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='purchase',
            name='status',
            field=models.CharField(blank=True, choices=[('pending', 'Pending'), ('approved', 'Approved')], max_length=10, null=True),
        ),
    ]