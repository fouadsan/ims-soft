from purchases.models import ProductAttribute
from django.db import models
from django.core.files import File
import barcode
from barcode.writer import ImageWriter
from io import BytesIO
import string
import secrets

from users.models import Company

# class ProductStock(models.Model):
#     STATUS_CHOICE = (
#         ('unavailable', 'unavailable'),
#         ('low', 'low'),
#         ('medium', 'medium'),
#         ('available', 'available')
#     )
#     product = models.OneToOneField(Product, on_delete=models.CASCADE)
#     product_attribute = models.ForeignKey(ProductAttribute, on_delete=models.RESTRICT, blank=True, null=True)
#     buy_price = models.PositiveIntegerField(blank=True, null=True)
#     sale_price = models.PositiveIntegerField(blank=True, null=True)
#     discount = models.PositiveIntegerField(blank=True, null=True)
#     reorder_level = models.IntegerField(default=0, blank=True, null=True)
#     status = models.CharField(max_length=11, choices=STATUS_CHOICE, blank=True, null=True)

#     class Meta:
#         ordering = ('-id', )
#         verbose_name = 'Stock'
#         verbose_name_plural = 'Stock'
    
#     def save(self, *args, **kwargs):
#         qs = Purchase.objects.get(id=self.purchase.id)
#         self.quantity += qs.qhantity
#         return super().save(*args, **kwargs)

#     def __str__(self):
#         return self.product.name


class Barcode(models.Model):
    product = models.OneToOneField(ProductAttribute, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.RESTRICT, blank=True, null=True, default=1)
    barcode_digit = models.CharField(max_length=13, blank=True, null=True)
    barcode_img = models.ImageField(upload_to='images/barcodes/', blank=True)
    # country_id = models.CharField(max_length=1, null=True)
    # manufacturer_id = models.CharField(max_length=6, null=True)
    # number_id = models.CharField(max_length=5, null=True)

    def save(self, *args, **kwargs):
        if not self.barcode_digit:
            alphabet = string.ascii_letters + string.digits
            code = f'{self.company.name[:3]}' + ''.join(secrets.choice(alphabet) for i in range(9))
            code_39 = barcode.get_barcode_class('code39')
            code39_digit = code_39(code)
            self.barcode_digit = code39_digit
            code39_image = code_39(code, writer=ImageWriter())
            buffer = BytesIO()
            code39_image.write(buffer)
            self.barcode_img.save(f'{self.product.product.name}_code.png', File(buffer), save=False)
            return super().save(*args, **kwargs)
    
    class Meta:
        ordering = ('-id', )
    
    def __str__(self):
        return f"Barcode of: {self.product.product.name}"
