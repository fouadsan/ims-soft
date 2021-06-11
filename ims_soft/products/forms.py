from django import forms
from crispy_forms.helper import FormHelper, Layout
from crispy_forms.layout import Field, Submit

from .models import Category, Product


class CategoryForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('name', id="id_updateName"),
        )
        self.helper.add_input(Submit('submit', 'Submit', css_class='btn-primary'))
        self.helper.form_method = 'POST'
        super(CategoryForm, self).__init__(*args, **kwargs)
    class Meta:
        model = Category
        exclude = ('created_at',)


class ProductForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('name', id="id_updateName"),
            Field('category', id="id_updateCategory"),
            Field('article_num', id="id_updateArticle_num"),
        )
        self.helper.add_input(Submit('submit', 'Submit', css_class='btn-primary'))
        self.helper.form_method = 'POST'
        super(ProductForm, self).__init__(*args, **kwargs)
       
    class Meta:
        model = Product
        exclude = ('created_by', 'created_at', 'updated_at')
