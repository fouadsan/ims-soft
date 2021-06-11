from django import forms
from crispy_forms.helper import FormHelper, Layout
from crispy_forms.layout import Field, Submit

from .models import ProductStock

class StockForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('reorder_level', id="id_updateReorderLevel"),
        )
        self.helper.add_input(Submit('submit', 'Submit', css_class='btn-primary'))
        self.helper.form_method = 'POST'
        super(StockForm, self).__init__(*args, **kwargs)
    class Meta:
        model = ProductStock
        exclude = ('product', 'quantity', 'buy_price', 'sale_price', 'discount', 'status')