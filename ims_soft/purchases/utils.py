# from django.http import HttpResponse
# from django.template.loader import get_template
# from io import BytesIO
# from xhtml2pdf import pisa


# def get_status(obj):
#     if int(obj.quantity) <= int(obj.reorder_level):
#         obj.status = 'low'
#     elif int(obj.quantity) > int(obj.reorder_level) and int(obj.quantity) <= int(obj.reorder_level) + 10:
#         obj.status = 'medium'
#     else:
#         obj.status = 'available'
#     obj.save()


# def render_to_pdf(template_src, context_dict={}):
#     template = get_template(template_src)
#     html = template.render(context_dict)
#     result = BytesIO()
#     pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
#     if not pdf.err:
#         return HttpResponse(result.getvalue(), content_type='application/pdf')
#     return None
