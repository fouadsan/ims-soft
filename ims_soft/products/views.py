from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from .utils import load_objects, objects_list_and_create, object_data, update_object, delete_object, \
    delete_selected_objects
from .forms import ProductForm, CategoryForm
from .resources import ProductResource


@login_required
def categories_list_and_create(request):
    form = CategoryForm(request.POST or None)
    if request.is_ajax():
        return objects_list_and_create(request, form)
    context = {
        'section_title': 'Categories',
        'title': 'List-Categories',
        'form': form
    }
    return render(request, 'products/list_categories.html', context)


@login_required
def load_categories(request, num):
    if request.is_ajax():
        return load_objects(request, num, "Category")
    return redirect('products:categories')


@login_required
def category_data(request, pk):
    if request.is_ajax():
        return object_data(request, "Category", pk)
    return redirect('products:categories')


@login_required
def update_category(request, pk):
    if request.is_ajax():
        return update_object(request, "Category", pk)
    return redirect('products:categories')


@login_required
def delete_category(request, pk):
    if request.is_ajax():
        return delete_object(request, "Category", pk)
    return redirect('products:categories')


def delete_selected_categories(request):
    if request.is_ajax():
        return delete_selected_objects(request, "Category")
    return redirect('products:categories')


def products_list_and_create(request):
    form = ProductForm(request.POST or None)
    if request.is_ajax():
        return objects_list_and_create(request, form)
    context = {
        'section_title': 'Products',
        'title': 'List-Products',
        'form': form
    }
    return render(request, 'products/list_products.html', context)


@login_required
def load_products(request, num):
    if request.is_ajax():
        return load_objects(request, num, "Product")
    return redirect('products:products')


@login_required
def product_data(request, pk):
    if request.is_ajax():
        return object_data(request, "Product", pk)
    return redirect('products:products')


@login_required
def update_product(request, pk):
    if request.is_ajax():
        return update_object(request, "Product", pk)
    return redirect('products:products')


@login_required
def delete_product(request, pk):
    if request.is_ajax():
        return delete_object(request, "Product", pk)
    return redirect('products:products')


def delete_selected_products(request):
    if request.is_ajax():
        return delete_selected_objects(request, "Product")
    return redirect('products:products')


def export_csv(request):
    product_resource = ProductResource()
    dataset = product_resource.export()
    response = HttpResponse(dataset.csv, content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="products.csv"'
    return response
