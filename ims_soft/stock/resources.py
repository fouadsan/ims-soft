from purchases.models import ProductAttribute
from import_export import resources


class ProductStockResource(resources.ModelResource):
    class Meta:
        model = ProductAttribute