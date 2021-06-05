from django import forms

<<<<<<< HEAD
from .models import Client, Employee, Supplier
=======
from .models import Client, Employer, Supplier
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
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

<<<<<<< HEAD
class EmployeeForm(forms.ModelForm):
=======
class EmployerForm(forms.ModelForm):
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
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
<<<<<<< HEAD
        super(EmployeeForm, self).__init__(*args, **kwargs)
    class Meta:
        model = Employee
=======
        super(EmployerForm, self).__init__(*args, **kwargs)
    class Meta:
        model = Employer
>>>>>>> f8d56b506ebe52bcb849e5ab5e4e29c9e8dd6750
        fields = ('name', 'phone', 'address', 'salary', 'down_payments')


