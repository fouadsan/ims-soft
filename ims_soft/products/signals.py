from django.db.models.signals import post_save
from .models import Product
from django.dispatch import receiver
from purchases.models import ProductAttribute


@receiver(post_save, sender=Product)
def create_productattribute(sender, instance, created, **kwargs):
    if created:
        ProductAttribute.objects.create(product=instance)


@receiver(post_save, sender=ProductAttribute)
def save_productattribute(sender, instance, **kwargs):
    instance.product.save() 