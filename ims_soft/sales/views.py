from django.shortcuts import render

def new_sale(request):
    context = {
        'section_title': 'Sales',
        'title': 'New-Sale'
    }
    return render(request, 'sales/new_sale.html', context)