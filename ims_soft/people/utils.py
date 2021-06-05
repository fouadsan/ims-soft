from django.http import JsonResponse

<<<<<<< HEAD
from .models import Supplier, Client, Employee

def objects_list_and_create(request, form):
    instance = form.save()
    print(instance)
    if hasattr(instance, 'salary'):
        return JsonResponse({
            'id': instance.id,
            'name': instance.name,
            'phone': instance.phone,
            'salary': instance.salary,
            'down_payments': instance.down_payments
        })
    else :
        return JsonResponse({
            'id': instance.id,
            'name': instance.name,
            'email': instance.email,
            'phone': instance.phone,
            'fax': instance.fax,
            'address': instance.address
        })
=======
from .models import Supplier, Client, Employer

def objects_list_and_create(request, form):
    if form.is_valid():
        instance = form.save()
        print(instance)
        if hasattr(instance, 'salary'):
            return JsonResponse({
                'id': instance.id,
                'name': instance.name,
                'phone': instance.phone,
                'salary': instance.salary,
                'down_payments': instance.down_payments
            })
        else :
            return JsonResponse({
                'id': instance.id,
                'name': instance.name,
                'email': instance.email,
                'phone': instance.phone,
                'fax': instance.fax,
                'address': instance.address
            })
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
    

def load_objects(request, num_objs, model):
    model = eval(model)
<<<<<<< HEAD
    visible = 5
    upper = num_objs
    lower = upper - visible
    size = model.objects.all().count()
    qs = model.objects.all()
    data = []
    for obj in qs:
        if model == Employee:
            item = {
                'id': obj.id,
                'name': obj.name,                   
                'phone': obj.phone,
                'address': obj.address,
                'salary': obj.salary,
                'down_payments': obj.down_payments
            }
        else:
            item = {
                    'id': obj.id,
                    'name': obj.name,
                    'email': obj.email,
                    'phone': obj.phone,
                    'fax': obj.fax,
                    'address': obj.address
                }
        data.append(item)
    return JsonResponse({'data': data[lower:upper], 'size': size})
=======
    if request.is_ajax():
        visible = 5
        upper = num_objs
        lower = upper - visible
        size = model.objects.all().count()
        qs = model.objects.all()
        data = []
        for obj in qs:
            if model == Employer:
                item = {
                    'id': obj.id,
                    'name': obj.name,                   
                    'phone': obj.phone,
                    'address': obj.address,
                    'salary': obj.salary,
                    'down_payments': obj.down_payments
                }
            else:
                item = {
                        'id': obj.id,
                        'name': obj.name,
                        'email': obj.email,
                        'phone': obj.phone,
                        'fax': obj.fax,
                        'address': obj.address
                    }
            data.append(item)
        return JsonResponse({'data': data[lower:upper], 'size': size})
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750


def object_data(request, model, pk):
    model = eval(model)
<<<<<<< HEAD
    obj = model.objects.get(pk=pk)
    if model == Employee:
        data = {
            'id': obj.id,
            'name': obj.name,
            'phone': obj.phone,
            'address': obj.address,
            'salary': obj.salary,
            'down_payments': obj.down_payments,
        }
    else :
        data = {
            'id': obj.id,
            'name': obj.name,
            'email': obj.email,
            'phone': obj.phone,
            'fax': obj.fax,
            'address': obj.address,
        }
    return JsonResponse({'data': data})
=======
    if request.is_ajax():
        obj = model.objects.get(pk=pk)
        if model == Employer:
            data = {
                'id': obj.id,
                'name': obj.name,
                'phone': obj.phone,
                'address': obj.address,
                'salary': obj.salary,
                'down_payments': obj.down_payments,
            }
        else :
            data = {
                'id': obj.id,
                'name': obj.name,
                'email': obj.email,
                'phone': obj.phone,
                'fax': obj.fax,
                'address': obj.address,
            }
        return JsonResponse({'data': data})
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750

def update_object(request, model, pk):
    model = eval(model)
    obj = model.objects.get(pk=pk)
<<<<<<< HEAD
 
    if model == Employee:
        new_name = request.POST.get('name')
        new_phone = request.POST.get('phone')
        new_address = request.POST.get('address')
        new_salary = request.POST.get('salary')
        new_down_payments = request.POST.get('down_payments')
        obj.name = new_name
        obj.phone = new_phone
        obj.address = new_address
        obj.salary = new_salary
        obj.new_down_payments = new_down_payments
        obj.save()
        return JsonResponse({
            'name': new_name,
            'phone': new_phone,
            'address': new_address,
            'salary': new_salary,
            'down_payments': new_down_payments
        })
    else :
        new_name = request.POST.get('name')
        new_email = request.POST.get('email')
        new_phone = request.POST.get('phone')
        new_fax = request.POST.get('fax')
        new_address = request.POST.get('address')
        obj.name = new_name
        obj.email = new_email
        obj.phone = new_phone
        obj.fax = new_fax
        obj.address = new_address
        obj.save()
        return JsonResponse({
            'name': new_name,
            'email': new_email,
            'phone': new_phone,
            'fax': new_fax,
            'address': new_address
        })
=======
    if request.is_ajax():
        if model == Employer:
            new_name = request.POST.get('name')
            new_phone = request.POST.get('phone')
            new_address = request.POST.get('address')
            new_salary = request.POST.get('salary')
            new_down_payments = request.POST.get('down_payments')
            obj.name = new_name
            obj.phone = new_phone
            obj.address = new_address
            obj.salary = new_salary
            obj.new_down_payments = new_down_payments
            obj.save()
            return JsonResponse({
                'name': new_name,
                'phone': new_phone,
                'address': new_address,
                'salary': new_salary,
                'down_payments': new_down_payments,
            })
        else :
            new_name = request.POST.get('name')
            new_email = request.POST.get('email')
            new_phone = request.POST.get('phone')
            new_fax = request.POST.get('fax')
            new_address = request.POST.get('address')
            obj.name = new_name
            obj.email = new_email
            obj.phone = new_phone
            obj.fax = new_fax
            obj.address = new_address
            obj.save()
            return JsonResponse({
                'name': new_name,
                'email': new_email,
                'phone': new_phone,
                'fax': new_fax,
                'address': new_address,
            })
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
    

def delete_object(request, model, pk):
    model = eval(model)
    obj = model.objects.get(pk=pk)
    obj.delete()
    return JsonResponse({'msg':'Object has been deleted'})
