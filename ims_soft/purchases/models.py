from django.db import models
from django.contrib.auth.models import User

from people.models import Supplier
from products.models import Product


class Purchase(models.Model):
    STATUS_CHOICE = (
        ('pending', 'Pending'),
        ('approved', 'Approved')
    )
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
    total = models.PositiveIntegerField(null=True, default=0)
    sub_total = models.PositiveIntegerField(null=True, default=0)
    discount = models.PositiveIntegerField(null=True, default=0)
    tax = models.PositiveIntegerField(null=True, default=0)
    grand_total = models.PositiveIntegerField(null=True, default=0)
    payment = models.PositiveIntegerField(null=True, default=0)
    left_to_pay = models.PositiveIntegerField(null=True, default=0)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICE, blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.RESTRICT ,blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        ordering = ('-id', )

    def __str__(self):
        return f"purchase N°: {self.id}"


class ProductAttribute(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE, blank=True, null=True)
    quantity = models.PositiveIntegerField(default=0)
    STATUS_CHOICE = (
        ('unavailable', 'unavailable'),
        ('low', 'low'),
        ('medium', 'medium'),
        ('available', 'available')
    )
    buy_price = models.PositiveIntegerField(blank=True, null=True)
    sale_price = models.PositiveIntegerField(blank=True, null=True)
    reorder_level = models.IntegerField(default=0, blank=True, null=True)
    status = models.CharField(max_length=11, choices=STATUS_CHOICE, blank=True, null=True)

    class Meta:
        ordering = ('-id', )
        verbose_name_plural = 'ProductsAttributes'


    def __str__(self):
        return self.product.name

        
    