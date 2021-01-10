from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=80)
    password = models.CharField(max_length=100)
    email = models.EmailField(verbose_name='email address', max_length=254, unique=True, db_index=True)
    created = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    