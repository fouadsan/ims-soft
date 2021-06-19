from django.db import models
from django.contrib.auth.models import User

from people.models import Client
from products.models import Product


class Sale(models.Model):
    STATUS_CHOICE = (
        ('pending', 'Pending'),
        ('decline', 'Decline'),
        ('approved', 'Approved'),
        ('processing', 'Processing'),
        ('complete', 'Complete'),
        ('bulk', 'Bulk'),
    )
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
    sub_total = models.PositiveIntegerField(blank=True, null=True, default=0)
    discount = models.PositiveIntegerField(blank=True, null=True, default=0)
    tax = models.PositiveIntegerField(blank=True, null=True, default=0)
    grand_total = models.PositiveIntegerField(null=True, default=0)
    payment = models.PositiveIntegerField(blank=True, null=True, default=0)
    left_to_pay = models.PositiveIntegerField(blank=True, null=True, default=0)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICE, blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.RESTRICT ,blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        ordering = ('-id', )

    def __str__(self):
        return f"sale N°: {self.id}"
