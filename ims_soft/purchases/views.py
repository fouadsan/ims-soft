from django.shortcuts import render

def new_purchase(request):
    context = {
        'section_title': 'Purchases',
        'title': 'New-Purchase'
    }
    return render(request, 'purchases/new_purchase.html', context)

