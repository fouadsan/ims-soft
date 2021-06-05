from django.db import models


class Supplier(models.Model):

    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=13, blank=True, null=True)
    fax = models.CharField(max_length=13, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Supplier: {self.name}"

    class Meta:
        ordering = ("-id",)

class Client(models.Model):

    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=13, blank=True, null=True)
    fax = models.CharField(max_length=13, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Client: {self.name}"

    class Meta:
        ordering = ("-id",)

class Employee(models.Model):

    name = models.CharField(max_length=200)  
    phone = models.CharField(max_length=13, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    salary = models.PositiveIntegerField()
    down_payments = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return f"Employee: {self.name}"

    class Meta:
        ordering = ("-id",)
