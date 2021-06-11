from .models import Product

def get_context(request):
    products = Product.objects.all()

    context = {
        'products': products,
    }
    return context