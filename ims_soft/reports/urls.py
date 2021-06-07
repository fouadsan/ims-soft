from django.urls import path

from .views import purchase_report, sale_report

app_name = 'reports'

urlpatterns = [
    path('purchase-report/', purchase_report, name='purchase-report'),
    path('sale-report/', sale_report, name='sale-report'),
]
