from django.urls import path

from .views import (suppliers_list_and_create, load_suppliers, supplier_data, update_supplier, delete_supplier, \
    clients_list_and_create, load_clients, client_data, update_client, delete_client, employers_list_and_create, \
        load_employers, employer_data, update_empoloyer, delete_employer)
        

app_name = 'people'

urlpatterns = [
    path('suppliers/', suppliers_list_and_create, name='suppliers'),
    path('suppliers/data/<int:num>/',
         load_suppliers, name='suppliers-data'),
    path('suppliers/update/<pk>', update_supplier, name='suppplier-update'),
    path('suppliers/data/<pk>', supplier_data, name='supplier-data'),
    path('suppliers/delete/<pk>', delete_supplier, name='supplier-delete'),

    path('clients/', clients_list_and_create, name='clients'),
    path('clients/data/<int:num>/',
         load_clients, name='clients-data'),
    path('clients/update/<pk>', update_client, name='client-update'),
    path('clients/data/<pk>', client_data, name='client-data'),
    path('clients/delete/<pk>', delete_client, name='client-delete'),

     path('employers/', employers_list_and_create, name='employers'),
     path('employers/data/<int:num>/',
         load_employers, name='employers-data'),
    path('employers/update/<pk>', update_empoloyer, name='emloyers-update'),
    path('employers/data/<pk>', employer_data, name='emloyers-data'),
    path('employers/delete/<pk>', delete_employer, name='emloyers-delete'),
   
]
