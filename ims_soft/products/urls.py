from django.urls import path

from .views import (categories_list_and_create, load_categories, category_data, update_category, delete_category, delete_selected_categories,
                    products_list_and_create, load_products, product_data, update_product, delete_product, delete_selected_products, export_csv)

app_name = 'products'

urlpatterns = [
    path('categories/', categories_list_and_create, name='categories'),
    path('categories/data/<int:num>/',
         load_categories, name='categories-data'),
    path('categories/update/<pk>', update_category, name='suppplier-update'),
    path('categories/data/<pk>', category_data, name='category-data'),
    path('categories/delete/<pk>', delete_category, name='category-delete'),
    path('categories/delete-selected/',
         delete_selected_categories, name='delete-selected-categories'),

    path('products/', products_list_and_create, name='products'),
    path('products/data/<int:num>/',
         load_products, name='products-data'),
    path('products/update/<pk>', update_product, name='product-update'),
    path('products/data/<pk>', product_data, name='product-data'),
    path('products/delete/<pk>', delete_product, name='product-delete'),
    path('products/delete-selected/',
         delete_selected_products, name='delete-selected-products'),
    path('products/export-csv', export_csv, name='export-csv'),

]
