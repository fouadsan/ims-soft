from .models import Company

def get_context(request):
    my_company = Company.objects.first()

    context = {
        'my_company': my_company,
    }
    return context