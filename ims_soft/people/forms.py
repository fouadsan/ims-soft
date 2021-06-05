from django import forms

from .models import Client, Employee, Supplier
from crispy_forms.helper import FormHelper, Layout
from crispy_forms.layout import Field, Submit

class SupplierForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('name', id="id_updateName"),
            Field('email', id="id_updateEmail"),
            Field('phone', id="id_updatePhone"),
            Field('fax', id="id_updateFax"),
            Field('address', id="id_updateAddress")
        )
        self.helper.add_input(Submit('submit', 'Submit', css_class='btn-primary'))
        self.helper.form_method = 'POST'
        super(SupplierForm, self).__init__(*args, **kwargs)
    class Meta:
        model = Supplier
        fields = ('name', 'email', 'phone', 'fax', 'address')

class ClientForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('name', id="id_updateName"),
            Field('email', id="id_updateEmail"),
            Field('phone', id="id_updatePhone"),
            Field('fax', id="id_updateFax"),
            Field('address', id="id_updateAddress")
        )
        self.helper.add_input(Submit('submit', 'Submit', css_class='btn-primary'))
        self.helper.form_method = 'POST'
        super(ClientForm, self).__init__(*args, **kwargs)
    class Meta:
        model = Client
        fields = ('name', 'email', 'phone', 'fax', 'address')

class EmployeeForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('name', id="id_updateName"),
            Field('phone', id="id_updatePhone"),
            Field('address', id="id_updateAddress"),
            Field('salary', id="id_updateSalary"),
            Field('down_payments', id="id_updateDownPay")
        )
        self.helper.add_input(Submit('submit', 'Submit', css_class='btn-primary'))
        self.helper.form_method = 'POST'
        super(EmployeeForm, self).__init__(*args, **kwargs)
    class Meta:
        model = Employee
        fields = ('name', 'phone', 'address', 'salary', 'down_payments')


