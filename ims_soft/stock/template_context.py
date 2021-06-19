from purchases.models import ProductAttribute

def get_context(request):
    products_stock = ProductAttribute.objects.filter(quantity__gt=0)

    context = {
        'products_stock': products_stock,
    }
    return context