from django.shortcuts import render

def purchase_report(request):
    context = {
        'section_title': 'Reports',
        'title': 'Purchase-Report'
    }
    return render(request, 'reports/purchase_report.html', context)


def sale_report(request):
    context = {
        'section_title': 'Reports',
        'title': 'Sale-Report'
    }
    return render(request, 'reports/sale_report.html', context)
