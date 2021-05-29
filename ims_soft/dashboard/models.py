from django.db import models
from django.core.validators import MinLengthValidator


class Company(models.Model):
    name = models.CharField(max_length=200, validators=[MinLengthValidator(
        limit_value=3, message="Name must be 3 characters at least")])
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=13, blank=True, null=True)
    address = models.CharField(max_length=500, blank=True, null=True)
    web_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"Company: {self.name}"

    class Meta:
        verbose_name = 'company'
        verbose_name_plural = 'company'
