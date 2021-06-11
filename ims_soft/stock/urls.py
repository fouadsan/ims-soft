from django import views
from django.urls import path

from .views import stock_list, load_stock, update_stock, stock_data, ViewPDF, export_csv

app_name = 'stock'

urlpatterns = [
    path('stock-list/', stock_list, name='stock-list'),
    path('stock-list/data/<int:num>/',
         load_stock, name='stock-data'),
    path('stock-list/data/<pk>', stock_data, name='stock-data'),
    path('stock-list/update/<pk>', update_stock, name='stock-update'),
    path('stock-list/pdf_view', ViewPDF.as_view(), name='pdf-view'),
    path('stock-list/export-csv', export_csv, name='export-csv'),
]