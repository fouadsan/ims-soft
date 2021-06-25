from django.contrib.auth.forms import AuthenticationForm
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, PasswordResetForm, SetPasswordForm
from crispy_forms.helper import FormHelper

from .models import Profile, Company


class CompanyForm(forms.ModelForm): 
    name = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control', 'placeholder':'Company Name (Required)', 'minlength':'3'}))
    product_key = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control color-class', 'placeholder':'Product Activation Key (Required)', 'minlength':'3', 'maxlength':'25'}))
    email = forms.EmailField(widget=forms.TextInput(attrs={'class':'form-control', 'placeholder':'Company Email (Optional)'}), required=False)
    phone = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control mob_no', 'data-mask':'9999-999-999' ,'placeholder':'Company Phone (Optional)'}), required=False)
    address = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control', 'placeholder':'Company Address (Optional)'}), required=False)
    web_url = forms.URLField(widget=forms.TextInput(attrs={'class':'form-control', 'placeholder':'Website (Optional)'}), required=False)

    

    class Meta:
        model = Company
        fields = ('name', 'product_key', 'email', 'phone', 'address', 'web_url')

    
class UserRegisterForm(UserCreationForm):

    def __init__(self, *args, **kwargs):
        super(UserRegisterForm, self).__init__(*args, **kwargs)

        self.helper = FormHelper()
        self.helper.form_show_labels = False

    username = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control mb-3', 'placeholder': 'Username', 'id': 'Username'}))
    email = forms.EmailField(widget=forms.EmailInput(
        attrs={'class': 'form-control mb-3', 'placeholder': 'Email', 'id': 'Email'}))
    password1 = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': 'form-control mb-3',
            'placeholder': 'Password1',
            'id': 'Password1',
        }

    ))
    password2 = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': 'form-control mb-3',
            'placeholder': 'Password2',
            'id': 'Password2',
        }

    ))


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'email',
                  'phone', 'address', 'city', 'image')

    image = forms.ImageField(
        error_messages={'invalid': "Image files only"}, widget=forms.FileInput)
    image.widget.attrs["onchange"] = "upload_img(this);"


class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)

        self.helper = FormHelper()
        self.helper.form_show_labels = False

    username = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control mb-3', 'placeholder': 'Username', 'id': 'Username'}))
    password = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': 'form-control mb-3',
            'placeholder': 'Password',
            'id': 'Password',
        }

    ))


class ResetPasswordForm(PasswordResetForm):
    def __init__(self, *args, **kwargs):
        super(ResetPasswordForm, self).__init__(*args, **kwargs)

        self.helper = FormHelper()
        self.helper.form_show_labels = False

    email = forms.EmailField(widget=forms.EmailInput(
        attrs={'class': 'form-control mb-3', 'placeholder': 'Email', 'id': 'Email'}))


class ResetPasswordConfirmForm(SetPasswordForm):
    def __init__(self, *args, **kwargs):
        super(ResetPasswordConfirmForm, self).__init__(*args, **kwargs)

        self.helper = FormHelper()
        self.helper.form_show_labels = False

    new_password1 = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': 'form-control mb-3',
            'placeholder': 'New Password',
            'id': 'Password1',
        }

    ))
    new_password2 = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': 'form-control mb-3',
            'placeholder': 'Confim Password',
            'id': 'Password2',
        }

    ))
