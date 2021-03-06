from django.urls import path
from django.contrib.auth import views as auth_views
from .views import profile_view, signup_view, company_view
from .forms import UserLoginForm, ResetPasswordForm, ResetPasswordConfirmForm
from django.urls import path, reverse_lazy

app_name = 'users'

urlpatterns = [
    path('', profile_view, name='profile'),
    path('sign-up/', signup_view, name='signup'),
    path('login/', auth_views.LoginView.as_view(
        template_name='users/login.html',
        authentication_form=UserLoginForm,
        extra_context={'header': 'Login'}),
        name='login'
    ),
    path('logout/', auth_views.LogoutView.as_view(template_name='users/logout.html',
                                                  extra_context={'header': 'Logout'},), name='logout'),
    path('password-reset/',
         auth_views.PasswordResetView.as_view(
             template_name='users/password_reset.html',
             form_class=ResetPasswordForm,
             extra_context={'header': 'Password Reset'},
             success_url=reverse_lazy('users:password_reset_done')
         ),
         name='password_reset',
         ),

    path('password-reset/done/',
         auth_views.PasswordResetDoneView.as_view(
             template_name='users/password_reset_done.html',
             extra_context={'header': 'Password Reset'},
         ),
         name='password_reset_done'
         ),
    path('password-reset-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(
             template_name='users/password_reset_confirm.html',
             form_class=ResetPasswordConfirmForm,
             extra_context={'header': 'Change your password'},
         ),
         name='password_reset_confirm'
         ),
    path('company/', company_view, name='company')
]
