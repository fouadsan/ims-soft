from django.urls import path

from .views import (suppliers_list_and_create, load_suppliers, supplier_data, update_supplier, delete_supplier, delete_selected_suppliers,
                    clients_list_and_create, load_clients, client_data, update_client, delete_client, delete_selected_clients, employees_list_and_create,
                    load_employees, employee_data, update_empoloyer, delete_employee, delete_selected_employees)


app_name = 'people'

urlpatterns = [
    path('suppliers/', suppliers_list_and_create, name='suppliers'),
    path('suppliers/data/<int:num>/',
         load_suppliers, name='suppliers-data'),
    path('suppliers/update/<pk>', update_supplier, name='suppplier-update'),
    path('suppliers/data/<pk>', supplier_data, name='supplier-data'),
    path('suppliers/delete/<pk>', delete_supplier, name='supplier-delete'),
    path('suppliers/delete-selected/',
         delete_selected_suppliers, name='delete-selected-suppliers'),

    path('clients/', clients_list_and_create, name='clients'),
    path('clients/data/<int:num>/',
         load_clients, name='clients-data'),
    path('clients/update/<pk>', update_client, name='client-update'),
    path('clients/data/<pk>', client_data, name='client-data'),
    path('clients/delete/<pk>', delete_client, name='client-delete'),
    path('clients/delete-selected/',
         delete_selected_clients, name='delete-selected-clients'),

    path('employees/', employees_list_and_create, name='employees'),
    path('employees/data/<int:num>/',
         load_employees, name='employees-data'),
    path('employees/update/<pk>', update_empoloyer, name='employees-update'),
    path('employees/data/<pk>', employee_data, name='employees-data'),
    path('employees/delete/<pk>', delete_employee, name='employees-delete'),
    path('employees/delete-selected/',
         delete_selected_employees, name='delete-selected-employees')

]
