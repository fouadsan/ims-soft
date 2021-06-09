from django.urls import path

from .views import new_purchase

app_name = 'purchases'

urlpatterns = [
    path('new-purchase/', new_purchase, name='new-purchase'),
    # path('sale-report/', sale_report, name='sale-report'),
]
