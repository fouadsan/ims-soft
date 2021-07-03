from .models import Company
from .forms import CompanyForm
from .utils import get_company_form

def get_context(request):
    my_company = Company.objects.first()
    if my_company:
        company_form = CompanyForm(request.POST or None, instance=my_company)
    else:
        company_form = CompanyForm(request.POST or None)
    if request.is_ajax():
        company_form = get_company_form(company_form)
    context = {
        'my_company': my_company,
        'company_form': company_form
    }
    return context