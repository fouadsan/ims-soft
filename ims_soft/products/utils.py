from django.http import JsonResponse

from .models import Category, Product

def objects_list_and_create(request, form):
    instance = form.save(commit=False)
    instance.created_by=request.user
    instance = form.save()
    print(instance)
    if hasattr(instance, 'article_num'):
        return JsonResponse({
            'id': instance.id,
            'name': instance.name,
            'category': instance.category.name,
            'article_num': instance.article_num,
            'created_by': instance.created_by.username,
            'reorder_level': instance.reorder_level,
            'created_at': instance.created_at,
            'updated_at': instance.updated_at
        })
    else :
        return JsonResponse({
            'id': instance.id,
            'name': instance.name,
            'created_at': instance.created_at
        })
    

def load_objects(request, num_objs, model):
    model = eval(model)
    visible = 5
    upper = num_objs
    lower = upper - visible
    size = model.objects.all().count()
    qs = model.objects.all()
    data = []
    for obj in qs:
        if model == Product:
            item = {
                'id': obj.id,
                'name': obj.name,                   
                'category': obj.category.name,
                'article_num': obj.article_num,
                'created_by': obj.created_by.username,
                'reorder_level': obj.reorder_level,
                'created_at': obj.created_at,
                'updated_at': obj.updated_at
            }
        else:
            item = {
                    'id': obj.id,
                    'name': obj.name,
                    'created_at': obj.created_at
                }
        data.append(item)
    return JsonResponse({'data': data[lower:upper], 'size': size})


def object_data(request, model, pk):
    model = eval(model)
    obj = model.objects.get(pk=pk)
    if model == Product:
        data = {
            'id': obj.id,
            'name': obj.name,                   
            'category': obj.category.name,
            'article_num': obj.article_num,
            'created_by': obj.created_by.username,
            'reorder_level': obj.reorder_level,
            'created_at': obj.created_at,
            'updated_at': obj.updated_at
        }
    else :
        data = {
            'id': obj.id,
            'name': obj.name,
            'created_at': obj.created_at
        }
    return JsonResponse({'data': data})

def update_object(request, model, pk):
    model = eval(model)
    obj = model.objects.get(pk=pk)
 
    if model == Product:
        new_name = request.POST.get('name')
        new_category = request.POST.get('category')
        new_article_num = request.POST.get('article_num')
        new_reorder_level = request.POST.get('reorder_level')
        obj.name = new_name
        obj.category = Category.objects.get(id=new_category)
        obj.article_num = new_article_num
        obj.reorder_level = new_reorder_level
        obj.save()
        return JsonResponse({
            'name': new_name,
            'category': obj.category.name,
            'article_num': new_article_num,
            'reorder_level': new_reorder_level
        })
    else :
        new_name = request.POST.get('name')
        obj.name = new_name
        obj.save()
        return JsonResponse({
            'name': new_name
        })
    

def delete_object(request, model, pk):
    model = eval(model)
    obj = model.objects.get(pk=pk)
    obj.delete()
    return JsonResponse({'msg':'Object has been deleted'})
