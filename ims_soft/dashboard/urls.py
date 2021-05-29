from django.urls import path

from .views import index, company

app_name = 'dashboard'

urlpatterns = [
    path('', index, name='index'),
    path('company/', company, name='company'),
]
