from django import forms
from crispy_forms.helper import FormHelper, Layout
from crispy_forms.layout import Field, Submit

from .models import Purchase


class PurchaseForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('status', id="id_updateStatus"),
        )
        self.helper.add_input(
            Submit('submit', 'Submit', css_class='btn-primary'))
        self.helper.form_method = 'POST'
        super(PurchaseForm, self).__init__(*args, **kwargs)

    class Meta:
        model = Purchase
        exclude = ('supplier', 'product', 'discount', 'tax', 'discount',
                   'payment', 'left_to_pay', 'created_by', 'created_at')
