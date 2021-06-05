from . models import Supplier, Client, Employee

def get_context(request):
    suppliers = Supplier.objects.all()
    clients = Client.objects.all()
    employees = Employee.objects.all()

    context = {
        'suppliers': suppliers,
        'clients': clients,
        'employees': employees
    }
    return context