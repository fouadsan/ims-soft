from django.http import JsonResponse


def get_company_form(form):
    if form.is_valid():
        instance = form.save()
        return JsonResponse({
            'name': instance.name,
            'product_key': instance.product_key,
            'email': instance.email,
            'phone': instance.phone,
            'address': instance.address,
            'web_url': instance.web_url
        })
    return form