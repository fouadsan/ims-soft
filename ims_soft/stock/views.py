from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.views import View
from xhtml2pdf import context

from .models import Barcode, ProductStock
from .forms import StockForm
from .utils import get_status, render_to_pdf
from .resources import ProductStockResource


def stock_list(request):
    form = StockForm(request.POST or None)
    context = {
        'section_title': 'Stock',
        'title': 'List-Stock',
        'form': form
    }
    return render(request, 'stock/list_stock.html', context)


@login_required
def load_stock(request, num):
    if request.is_ajax():
        visible = 5
        upper = num
        lower = upper - visible
        size = ProductStock.objects.all().count()
        qs = ProductStock.objects.all()
        data = []
        for obj in qs:
            get_status(obj)
            barcode = Barcode.objects.get(product=obj.id)
            item = {
                'id': obj.id,
                'product': obj.product.name,
                'quantity': obj.quantity,
                'buy_price': obj.buy_price,
                'sale_price': obj.sale_price,
                'discount': obj.discount,
                'reorder_level': obj.reorder_level,
                'status': obj.status,
                'barcode_digit': barcode.barcode_digit
            }
            data.append(item)

        return JsonResponse({'data': data[lower:upper], 'size': size})


@login_required
def update_stock(request, pk):
    if request.is_ajax():
        obj = ProductStock.objects.get(pk=pk)
        new_reorder_level = request.POST.get('reorder_level')
        obj.reorder_level = new_reorder_level
        get_status(obj)
        return JsonResponse({
            'status': obj.status
        })

    return redirect('stock:stock-list')


@login_required
def stock_data(request, pk):
    if request.is_ajax():
        obj = ProductStock.objects.get(pk=pk)
        barcode = Barcode.objects.get(product=obj.id)
        data = {
            'id': obj.id,
            'reorder_level': obj.reorder_level,
            'status': obj.status,
            'barcode_img': barcode.barcode_img.url
        }
        return JsonResponse({'data': data})

    return redirect('stock:stock-list')


# data = {
# 	"company": "Dennnis Ivanov Company",
# 	"address": "123 Street name",
# 	"city": "Vancouver",
# 	"state": "WA",
# 	"zipcode": "98663",


# 	"phone": "555-555-2345",
# 	"email": "youremail@dennisivy.com",
# 	"website": "dennisivy.com",
# 	}

# Opens up page as PDF
qs = Barcode.objects.all()
data = {}
for obj in qs:

    item = {
        'id': obj.id,
        'barcode_digit': obj.barcode_digit,
        'barcode_img': obj.barcode_img
    }
    data.update(item)


class ViewPDF(View):

    def get(self, request, *args, **kwargs):
        pdf = render_to_pdf('stock/pdf_template.html', data)
        return HttpResponse(pdf, content_type='application/pdf')


def export_csv(request):
    product_resource = ProductStockResource()
    dataset = product_resource.export()
    response = HttpResponse(dataset.csv, content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="products_stock.csv"'
    return response
