from django.shortcuts import render, redirect

from people.utils import load_objects, objects_list_and_create, object_data, update_object, delete_object
from .forms import SupplierForm, ClientForm, EmployerForm


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


def load_suppliers(request, num):
    if request.is_ajax():
        return load_objects(request, num, "Supplier")
    return redirect('people:suppliers')


def supplier_data(request, pk):
    if request.is_ajax():
        return object_data(request, "Supplier", pk)
    return redirect('people:suppliers')


def update_supplier(request, pk):
    if request.is_ajax():
        return update_object(request, "Supplier", pk)
    return redirect('people:suppliers')


def delete_supplier(request, pk):
    if request.is_ajax():
        return delete_object(request, "Supplier", pk)
    return redirect('people:suppliers')


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


def load_clients(request, num):
    if request.is_ajax():
        return load_objects(request, num, "Client")
    return redirect('people:clients')


def client_data(request, pk):
    if request.is_ajax():
        return object_data(request, "Client", pk)
    return redirect('people:clients')


def update_client(request, pk):
    if request.is_ajax():
        return update_object(request, "Client", pk)
    return redirect('people:clients')


def delete_client(request, pk):
    if request.is_ajax():
        return delete_object(request, "Client", pk)
    return redirect('people:clients')


def employers_list_and_create(request):
    form = EmployerForm(request.POST or None)
    if request.is_ajax():
        return objects_list_and_create(request, form)
    return redirect('people:clients')
        
    context = {
        'section_title': 'People',
        'title': 'Employers',
        'form': form
    }

    return render(request, 'people/employers.html', context)


def load_employers(request, num):
    if request.is_ajax():
        return load_objects(request, num, "Employer")
    return redirect('people:employers')


def employer_data(request, pk):
    if request.is_ajax():
        return object_data(request, "Employer", pk)
    return redirect('people:employers')


def update_empoloyer(request, pk):
    if request.is_ajax():
        return update_object(request, "Employer", pk)
    return redirect('people:employers')


def delete_employer(request, pk):
    if request.is_ajax():
        return delete_object(request, "Employer", pk)
    return redirect('people:employers')