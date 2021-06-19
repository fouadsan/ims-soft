from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('dashboard.urls')),
    path('profile/', include('users.urls')),
    path('people/', include('people.urls')),
    path('products/', include('products.urls')),
    path('purchases/', include('purchases.urls')),
    path('sales/', include('sales.urls')),
    path('stock/', include('stock.urls')),
    path('reports/', include('reports.urls')),
    path('password-reset-complete/',
         auth_views.PasswordResetCompleteView.as_view(
             template_name='users/password_reset_complete.html',
             extra_context={'header': 'Password Reset'},
         ),
         name='password_reset_complete')
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
