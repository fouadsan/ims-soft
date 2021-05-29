from django.urls import path
from django.contrib.auth import views as auth_views
from .views import profile_view
from .forms import UserLoginForm

app_name = 'users'

urlpatterns = [
    path('', profile_view, name='profile'),
    path('login/', auth_views.LoginView.as_view(
        template_name='users/login.html',
        authentication_form=UserLoginForm,
        extra_context={'header': 'Login'},),
        name='login'
    ),
]
