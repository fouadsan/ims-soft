from django.shortcuts import render
from django.http import JsonResponse

from .forms import CompanyForm
from.models import Company


def index(request):
    return render(request, 'dashboard/index.html', {'title': 'Dashboard'})


def company(request):
    obj = Company.objects.first()
    form = CompanyForm(request.POST or None, instance=obj)
    if request.is_ajax():
        if form.is_valid():
            instance = form.save()
            return JsonResponse({
                'name': instance.name,
                'email': instance.email,
                'phone': instance.phone,
                'address': instance.address,
                'web_url': instance.web_url
            })
    context = {
        'section_title': 'Settings',
        'title': 'Company',
        'obj': obj,
        'form': form
    }
    return render(request, 'dashboard/company.html', context)
