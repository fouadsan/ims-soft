from django.forms import models
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.views import View
from xhtml2pdf import context
from django.urls import reverse_lazy

from .models import Purchase
from .forms import PurchaseForm, CreatePurchaseForm, ProductFormSet
from .resources import PurchaseResource
from products.models import Product
from purchases.models import ProductAttribute
from stock.models import Barcode
from .utils import render_to_pdf, get_status


def new_purchase(request):
    purchases = Purchase.objects.all()
    form = CreatePurchaseForm(request.POST or None)
    formset = ProductFormSet(request.POST or None)
    if request.method == 'POST':
        formset = ProductFormSet(request.POST)
        if form.is_valid() & formset.is_valid():
            instance = form.save(commit=False)
            instance.created_by = request.user
            instance.save()
            products = formset.cleaned_data
            for product in products:
                qs = Product.objects.get(name=product['products'])
                prodattr = ProductAttribute.objects.filter(pk=qs.id)
                if prodattr:
                    prodattr.update(quantity=prodattr.first().quantity + int(product['quantity'])) 
            return redirect(reverse_lazy("purchases:pdf-view"))
    context = {
        'purchases': purchases,
        'section_title': 'Purchases',
        'title': 'New-Purchase',
        'formset': formset,
        'form': form
    }
    return render(request, 'purchases/new_purchase.html', context)


# class PurchaseAddView(TemplateView):
#     template_name = "purchases/new_purchase.html"

#     # Define method to handle GET request
#     def get(self, *args, **kwargs):
#         # Create an instance of the formset
#         formset = PurchaseFormSet(queryset=Purchase.objects.none())
#         return self.render_to_response({'purchase_formset': formset})
    
#     # Define method to handle POST request
#     def post(self, request, *args, **kwargs):
#         user = request.user
#         formset = PurchaseFormSet(data=self.request.POST)

#         # Check if submitted forms are valid
#         if formset.is_valid():
#             instance = formset.save(commit=False)
#             instance.created_by = user
#             print(instance)     
#             formset.save()
#             return redirect(reverse_lazy("purchases:purchase-history"))

#         return self.render_to_response({'purchase_formset': formset})


def purchases_list(request):
    form = PurchaseForm(request.POST or None)
    context = {
        'section_title': 'Purchases',
        'title': 'Purchase History',
        'form': form
    }
    return render(request, 'purchases/purchase_history.html', context)


@login_required
def load_purchases(request, num):
    if request.is_ajax():
        visible = 5
        upper = num
        lower = upper - visible
        size = Purchase.objects.all().count()
        qs = Purchase.objects.all()
        data = []
        for obj in qs:
            get_status(obj)
            item = {
                'id': obj.id,
                'supplier': obj.supplier.name,
                'created_at': obj.created_at,
                'status': obj.status,
                'grand_total': obj.grand_total,
                'payment': obj.payment,
                'created_by': obj.created_by.username,
            }
            data.append(item)

        return JsonResponse({'data': data[lower:upper], 'size': size})


@login_required
def update_purchase(request, pk):
    if request.is_ajax():
        obj = Purchase.objects.get(pk=pk)
        new_payment = request.POST.get('payment')
        obj.payment = new_payment
        get_status(obj)
        obj.save()  
        return JsonResponse({
            'payment': obj.payment,
            'status': obj.status
        })
    return redirect('purchases:purchase-history')


@login_required
def purchase_data(request, pk):
    if request.is_ajax():
        obj = Purchase.objects.get(pk=pk)
        data = {
            'id': obj.id,
            'supplier': obj.supplier.name,
            'created_at': obj.created_at,
            'status': obj.status,
            'grand_total': obj.grand_total,
            'payment': obj.payment,
            'created_by': obj.created_by.username,
        }
        return JsonResponse({'data': data})

    return redirect('purchases:purchase-history')


@login_required
def delete_purchase(request, pk):
    if request.is_ajax():
        obj = Purchase.objects.get(pk=pk)
        obj.delete()
        return JsonResponse({'msg': 'Object has been deleted'})
    return redirect('purchases:purchase-history')


def delete_selected_purchases(request):
    if request.is_ajax():
        object_ids = request.POST.getlist(('id_list[]'))
        for id in object_ids:
            obj = Purchase.objects.get(pk=id)
            obj.delete()
        return JsonResponse({'msg': 'Objects have been deleted'})
    return redirect('purchases:purchase-history')

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
        pdf = render_to_pdf('purchases/pdf_template.html', data)
        return HttpResponse(pdf, content_type='application/pdf')


def auto_complete(request):
    if request.is_ajax():
        qs = Product.objects.all()
        data = []
        for obj in qs:
            item = {
                'name': obj.name,
            }
            data.append(item)
        return JsonResponse({'data': data})
    return redirect('purchases:purchase-history')

def export_csv(request):
    product_resource = PurchaseResource()
    dataset = product_resource.export()
    response = HttpResponse(dataset.csv, content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="purchase_history.csv"'
    return response
