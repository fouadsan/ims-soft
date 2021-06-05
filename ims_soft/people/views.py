from django.shortcuts import render, redirect
<<<<<<< HEAD
from django.contrib.auth.decorators import login_required

from people.utils import load_objects, objects_list_and_create, object_data, update_object, delete_object
from .forms import SupplierForm, ClientForm, EmployeeForm
from .models import Supplier
=======

from people.utils import load_objects, objects_list_and_create, object_data, update_object, delete_object
from .forms import SupplierForm, ClientForm, EmployerForm
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750


@login_required
def suppliers_list_and_create(request):
    form = SupplierForm(request.POST or None)
    if request.is_ajax():
        return objects_list_and_create(request, form)
<<<<<<< HEAD
    qs_json = json.dumps(list(Supplier.objects.values()))    
=======
        
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
    context = {
        'section_title': 'People',
        'title': 'Suppliers',
        'form': form
    }

    return render(request, 'people/suppliers.html', context)


<<<<<<< HEAD
@login_required
=======
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
def load_suppliers(request, num):
    if request.is_ajax():
        return load_objects(request, num, "Supplier")
    return redirect('people:suppliers')


<<<<<<< HEAD
@login_required
=======
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
def supplier_data(request, pk):
    if request.is_ajax():
        return object_data(request, "Supplier", pk)
    return redirect('people:suppliers')


<<<<<<< HEAD
@login_required
=======
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
def update_supplier(request, pk):
    if request.is_ajax():
        return update_object(request, "Supplier", pk)
    return redirect('people:suppliers')


<<<<<<< HEAD
@login_required
=======
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
def delete_supplier(request, pk):
    if request.is_ajax():
        return delete_object(request, "Supplier", pk)
    return redirect('people:suppliers')


<<<<<<< HEAD
@login_required
=======
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
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


<<<<<<< HEAD
@login_required
=======
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
def load_clients(request, num):
    if request.is_ajax():
        return load_objects(request, num, "Client")
    return redirect('people:clients')


<<<<<<< HEAD
@login_required
=======
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
def client_data(request, pk):
    if request.is_ajax():
        return object_data(request, "Client", pk)
    return redirect('people:clients')


<<<<<<< HEAD
@login_required
=======
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
def update_client(request, pk):
    if request.is_ajax():
        return update_object(request, "Client", pk)
    return redirect('people:clients')


<<<<<<< HEAD
@login_required
=======
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
def delete_client(request, pk):
    if request.is_ajax():
        return delete_object(request, "Client", pk)
    return redirect('people:clients')


<<<<<<< HEAD
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
=======
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
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
