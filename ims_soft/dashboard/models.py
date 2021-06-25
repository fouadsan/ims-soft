from django.db import models
from datetime import datetime, timedelta

class Event(models.Model):
    name = models.CharField(max_length=200)
    when = models.DateTimeField(default=datetime.now()+timedelta(days=7))

    def __str__(self):
        return str(self.name)