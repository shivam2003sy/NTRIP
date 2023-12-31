# imports

from typing import Any
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now
from django.contrib.auth.models import User
# Models

#NTRIP Server
class Server(models.Model):
    User = models.OneToOneField(User, on_delete=models.CASCADE)
    ip = models.CharField(max_length=100 , null=True , blank=True)
    latitude = models.FloatField(default=0)
    longitude = models.FloatField(default=0)
    altitude = models.FloatField(null=True , blank=True)
    def __str__(self):
        return str(self.User.id)

# client

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    ip = models.CharField(max_length=100 ,  null=True , blank=True) 
    latitude = models.FloatField(default=0)
    longitude = models.FloatField(default=0)
    altitude = models.FloatField(default=0)
    previous_latitude = models.FloatField(default=0)
    previous_longitude = models.FloatField(default=0)
    previous_altitude = models.FloatField(default=0)
    previous_time = models.DateTimeField(default=now, blank=True)
    def __str__(self):
        return self.name

