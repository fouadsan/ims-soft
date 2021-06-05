from django.contrib import admin

from .models import Supplier, Client, Employee

admin.site.register(Supplier)
admin.site.register(Client)
admin.site.register(Employee)
