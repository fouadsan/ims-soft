from django.shortcuts import render
from django.http import JsonResponse

from .forms import SupplierForm
from .models import Supplier


def suppliers_list_and_create(request):
    form = SupplierForm(request.POST or None)
    if request.is_ajax():
        if form.is_valid():
            instance = form.save()
            return JsonResponse({
                'id': instance.id,
                'name': instance.name,
                'email': instance.email,
                'phone': instance.phone,
                'fax': instance.fax,
                'address': instance.address
            })

    context = {
        'form': form,
    }

    return render(request, 'people/suppliers.html', context)


def load_suppliers(request, num_supps):
    if request.is_ajax():
        visible = 3
        upper = num_supps
        lower = upper - visible
        size = Supplier.objects.all().count()
        qs = Supplier.objects.all()
        data = []
        for obj in qs:
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
