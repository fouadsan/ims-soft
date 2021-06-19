from django import forms
from crispy_forms.helper import FormHelper, Layout
from crispy_forms.layout import Field, Submit
from django.forms import models
from django.forms import formset_factory

from .models import Sale
from products .models import Product
from people.models import Client


class SaleForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('payment', id="id_updatePayment"),
        )
        self.helper.add_input(
            Submit('submit', 'Submit', css_class='btn-primary'))
        self.helper.form_method = 'POST'
        super(SaleForm, self).__init__(*args, **kwargs)

    class Meta:
        model = Sale
        exclude = ('client', 'products', 'discount', 'tax', 'discount',
                   'status', 'left_to_pay', 'created_by', 'created_at')


class CreateClientForm(forms.ModelForm):
    # created_at = forms.DateInput()
    client = forms.ModelChoiceField(queryset=Client.objects.all(), widget=forms.Select(attrs={'class':'custom-select'}))  
    sub_total = forms.CharField(widget=forms.NumberInput(attrs={'class':'form-control', 'readonly':'readonly'}), initial=0)
    discount = forms.CharField(widget=forms.NumberInput(attrs={'class':'form-control'}), initial=0)
    tax = forms.CharField(widget=forms.NumberInput(attrs={'class':'form-control'}), initial=0)
    grand_total = forms.CharField(widget=forms.NumberInput(attrs={'class':'form-control', 'readonly':'readonly'}), initial=0)
    payment = forms.CharField(widget=forms.NumberInput(attrs={'class':'form-control'}), initial=0)
    left_to_pay = forms.CharField(widget=forms.NumberInput(attrs={'class':'form-control', 'readonly':'readonly'}), initial=0)
    class Meta:
        model = Client
        fields = ['client', 'sub_total', 'discount', 'tax','grand_total', 'payment', 'left_to_pay']



class ProductSaleForm(forms.Form):
    products = forms.CharField(label="", widget=forms.TextInput(attrs={'class':'form-control'}))
    sale_price = forms.CharField(label="", widget=forms.TextInput(attrs={'class':'form-control', 'readonly':'readonly'}), initial=0)
    quantity = forms.CharField(label="", widget=forms.TextInput(attrs={'class':'form-control'}))
    total_amount = forms.CharField(label="", widget=forms.TextInput(attrs={'class':'form-control', 'readonly':'readonly'}), initial=0)
ProductFormSet = formset_factory(ProductSaleForm, extra=1)
