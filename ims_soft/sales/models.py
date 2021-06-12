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
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    grand_total = models.PositiveIntegerField(blank=True, null=True)
    payment = models.PositiveIntegerField(blank=True, null=True)
    left_to_pay = models.PositiveIntegerField(blank=True, null=True)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICE, blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.RESTRICT)
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        ordering = ('-id', )

    def __str__(self):
        return f"sale N°: {self.id}"
