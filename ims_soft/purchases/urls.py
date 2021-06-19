from django.urls import path

from .views import new_purchase, purchases_list, export_csv, load_purchases, purchase_data, update_purchase, delete_purchase, \
      delete_selected_purchases, auto_complete, ViewPDF

app_name = 'purchases'

urlpatterns = [
    path('new-purchase/', new_purchase, name='new-purchase'),
    path('purchases/', purchases_list, name='purchase-history'),
    path('purchases/data/<int:num>/',
         load_purchases, name='load-data'),
    path('purchases/data/<pk>', purchase_data, name='purchase-data'),
    path('purchases/update/<pk>', update_purchase, name='purchase-update'),
    path('purchases/delete/<pk>', delete_purchase, name='purchase-delete'),
    path('purchases/delete-selected/',
         delete_selected_purchases, name='delete-selected-purchases'),
    # path('sale-report/', sale_report, name='sale-report'),
    path('new-purchase/auto-complete/', auto_complete, name='auto-complete'),
    path('new-purchase/pdf_view', ViewPDF.as_view(), name='pdf-view'),
    path('purchases/export-csv', export_csv, name='export-csv')
]
