from django.contrib.auth.forms import AuthenticationForm
from django import forms
from crispy_forms.helper import FormHelper

from .models import Profile


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'email',
                  'phone', 'address', 'city')


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
