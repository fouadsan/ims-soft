from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import subprocess
from django.http import JsonResponse
import re
import json
import time

from .models import Event

@login_required
def index(request):
    return render(request, 'dashboard/index.html', {'title': 'Dashboard'})

@login_required
def settings(request):
   events = Event.objects.all()
   context = {
       'title': 'General Settings',
       'events': events
   }
   return render(request, 'dashboard/settings.html', context)

 
def db_data(request):
    if request.is_ajax():
        backups = subprocess.run('manage.py listbackups', shell=True, stdout=subprocess.PIPE, text=True).stdout
        backups = re.split('\s+', backups)
        backups = backups[2::3][:-1]
        backups_json = json.dumps(backups)
        backups_json = json.loads(backups_json)
        return JsonResponse({
                'data':backups_json
            })


def db_backup(request):
    if request.is_ajax():
        subprocess.run('manage.py dbbackup --clean', shell=True)
        return JsonResponse({'msg': 'Database backup has been created'})


def db_restore(request):
    if request.is_ajax():
        db_name = request.POST.get('db_name')
        subprocess.run(f'manage.py dbrestore -i {db_name}', shell=True, input=b'y')
        return JsonResponse({'msg': 'Database has been restored'})