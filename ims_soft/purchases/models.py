from django.db import models
from django.contrib.auth.models import User

from people.models import Supplier
from products.models import Product 


class Purchase(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    discount = models.PositiveIntegerField(blank=True, null=True)
    tax = models.PositiveIntegerField(blank=True, null=True)
    payment = models.PositiveIntegerField(blank=True, null=True)
    left_to_pay = models.PositiveIntegerField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.RESTRICT)
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        ordering = ('-id', )
    
    def __str__(self):
        return f"purchase N°: {self.id}"

    

