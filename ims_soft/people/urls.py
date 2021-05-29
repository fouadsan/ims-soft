from django.urls import path

from .views import suppliers_list_and_create, load_suppliers

app_name = 'people'

urlpatterns = [
    path('suppliers/', suppliers_list_and_create, name='suppliers'),
    path('suppliers/data/<int:num_supps>/',
         load_suppliers, name='suppliers-data'),
]
