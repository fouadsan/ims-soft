from .models import ProductStock

def get_context(request):
    products_stock = ProductStock.objects.all()

    context = {
        'products_stock': products_stock,
    }
    return context