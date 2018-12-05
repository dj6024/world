from django.db import models

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=600)
    password = models.CharField(max_length=600)
    # token = models.CharField(max_length=600, default='')




