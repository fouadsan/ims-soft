# from django.test import TestCase
# import subprocess
# import json
# import re

# backups = subprocess.run('manage.py listbackups', shell=True, stdout=subprocess.PIPE, text=True).stdout
# backups = re.split('\s+', backups)

# backups = backups[2::3][:-1]

# # print(backups)
# backups_json = json.dumps(backups)

# print(backups_json)

# backups = subprocess.run('manage.py dbrestore', shell=True, stdout=subprocess.PIPE, text=True).stdout


from datetime import datetime, timedelta
print(datetime.now()-timedelta(days=7))