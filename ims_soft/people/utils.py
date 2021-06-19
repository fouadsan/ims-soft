from django.http import JsonResponse

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
    else:
        return JsonResponse({
            'id': instance.id,
            'name': instance.name,
            'email': instance.email,
            'phone': instance.phone,
            'fax': instance.fax,
            'address': instance.address,
            'credit1': instance.credit1,
            'credit2': instance.credit2
        })


def load_objects(request, num_objs, model):
    model = eval(model)
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
                'address': obj.address,
                'credit1': obj.credit1,
                'credit2': obj.credit2
            }
        data.append(item)
    return JsonResponse({'data': data[lower:upper], 'size': size})


def object_data(request, model, pk):
    model = eval(model)
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
    else:
        data = {
            'id': obj.id,
            'name': obj.name,
            'email': obj.email,
            'phone': obj.phone,
            'fax': obj.fax,
            'address': obj.address,
            'credit1': obj.credit1,
            'credit2': obj.credit2
        }
    return JsonResponse({'data': data})


def update_object(request, model, pk):
    model = eval(model)
    obj = model.objects.get(pk=pk)

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
    else:
        new_name = request.POST.get('name')
        new_email = request.POST.get('email')
        new_phone = request.POST.get('phone')
        new_fax = request.POST.get('fax')
        new_address = request.POST.get('address')
        new_credit1 = request.POST.get('credit1')
        new_credit2 = request.POST.get('credit2')
        obj.name = new_name
        obj.email = new_email
        obj.phone = new_phone
        obj.fax = new_fax
        obj.address = new_address
        obj.credit1 = new_credit1
        obj.credit2 = new_credit2
        obj.save()
        return JsonResponse({
            'name': new_name,
            'email': new_email,
            'phone': new_phone,
            'fax': new_fax,
            'address': new_address
        })


def delete_object(request, model, pk):
    model = eval(model)
    obj = model.objects.get(pk=pk)
    obj.delete()
    return JsonResponse({'msg': 'Object has been deleted'})


def delete_selected_objects(request, model):
    model = eval(model)
    object_ids = request.POST.getlist(('id_list[]'))
    for id in object_ids:
        obj = model.objects.get(pk=id)
        obj.delete()
    return JsonResponse({'msg': 'Objects have been deleted'})
