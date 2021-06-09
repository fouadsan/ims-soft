from django.urls import path

from .views import new_sale

app_name = 'sales'

urlpatterns = [
    path('new-sale/', new_sale, name='new-sale'),
    # path('sale-report/', sale_report, name='sale-report'),
]