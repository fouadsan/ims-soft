from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from people.utils import load_objects, objects_list_and_create, object_data, update_object, delete_object
from .forms import SupplierForm, ClientForm, EmployeeForm
from .models import Supplier


@login_required
def suppliers_list_and_create(request):
    form = SupplierForm(request.POST or None)
    if request.is_ajax():
        return objects_list_and_create(request, form)

    context = {
        'section_title': 'People',
        'title': 'Suppliers',
        'form': form
    }

    return render(request, 'people/suppliers.html', context)


@login_required
def load_suppliers(request, num):
    if request.is_ajax():
        return load_objects(request, num, "Supplier")
    return redirect('people:suppliers')


@login_required
def supplier_data(request, pk):
    if request.is_ajax():
        return object_data(request, "Supplier", pk)
    return redirect('people:suppliers')


@login_required
def update_supplier(request, pk):
    if request.is_ajax():
        return update_object(request, "Supplier", pk)
    return redirect('people:suppliers')


@login_required
def delete_supplier(request, pk):
    if request.is_ajax():
        return delete_object(request, "Supplier", pk)
    return redirect('people:suppliers')


@login_required
def clients_list_and_create(request):
    form = ClientForm(request.POST or None)
    if request.is_ajax():
        return objects_list_and_create(request, form)

    context = {
        'section_title': 'People',
        'title': 'Clients',
        'form': form
    }

    return render(request, 'people/clients.html', context)


@login_required
def load_clients(request, num):
    if request.is_ajax():
        return load_objects(request, num, "Client")
    return redirect('people:clients')


@login_required
def client_data(request, pk):
    if request.is_ajax():
        return object_data(request, "Client", pk)
    return redirect('people:clients')


@login_required
def update_client(request, pk):
    if request.is_ajax():
        return update_object(request, "Client", pk)
    return redirect('people:clients')


@login_required
def delete_client(request, pk):
    if request.is_ajax():
        return delete_object(request, "Client", pk)
    return redirect('people:clients')


@login_required
def employees_list_and_create(request):
    form = EmployeeForm(request.POST or None)
    if request.is_ajax():
        return objects_list_and_create(request, form)
        
    context = {
        'section_title': 'People',
        'title': 'employees',
        'form': form
    }

    return render(request, 'people/employees.html', context)


@login_required
def load_employees(request, num):
    if request.is_ajax():
        return load_objects(request, num, "Employee")
    return redirect('people:employees')


@login_required
def employee_data(request, pk):
    if request.is_ajax():
        return object_data(request, "Employee", pk)
    return redirect('people:employees')


@login_required
def update_empoloyer(request, pk):
    if request.is_ajax():
        return update_object(request, "Employee", pk)
    return redirect('people:employees')


@login_required
def delete_employee(request, pk):
    if request.is_ajax():
        return delete_object(request, "Employee", pk)
    return redirect('people:employees')
