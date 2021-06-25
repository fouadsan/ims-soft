from django.urls import path

from .views import index, settings, db_backup, db_data

app_name = 'dashboard'

urlpatterns = [
    path('', index, name='index'),
    path('settings/', settings, name='settings'),
    path('settings/db-data/', db_data, name='db-data'),
    path('settings/db-backup', db_backup, name='db-backup'),
]
