# from django.db.models.signals import m2m_changed
# from .models import Purchase, ProductAttribute


# def productStock_changed(sender, instance, action, *args, **kwargs):
#     if action in ['post_add']:
#         print("siggggggggggggggnals")
#         products = instance.products.all()
#         for product in products:
#             ProductAttribute.objects.create(product=product, purchase=instance)   

# m2m_changed.connect(productStock_changed, sender=Purchase.products.through)
