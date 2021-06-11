from import_export import resources
from .models import ProductStock


class ProductStockResource(resources.ModelResource):
    class Meta:
        model = ProductStock