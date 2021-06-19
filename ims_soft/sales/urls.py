from django.urls import path

from .views import new_sale, sales_list, export_csv, load_sales, sale_data, update_sale, delete_sale, \
      delete_selected_sales, auto_complete, ViewPDF

app_name = 'sales'

urlpatterns = [
    path('new-sale/', new_sale, name='new-sale'),
    path('sales/', sales_list, name='sale-history'),
    path('sales/data/<int:num>/',
         load_sales, name='load-data'),
    path('sales/data/<pk>', sale_data, name='sale-data'),
    path('sales/update/<pk>', update_sale, name='sale-update'),
    path('sales/delete/<pk>', delete_sale, name='sale-delete'),
    path('sales/delete-selected/',
         delete_selected_sales, name='delete-selected-sales'),
    # path('sale-report/', sale_report, name='sale-report'),
    path('new-sale/auto-complete/', auto_complete, name='auto-complete'),
    path('new-sale/pdf_view', ViewPDF.as_view(), name='pdf-view'),
    path('sales/export-csv', export_csv, name='export-csv')
]
