from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from pdb import set_trace


class MeritUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)

    # user types
    student = models.BooleanField(default=False)
    recommender = models.BooleanField(default=False)
    counselor = models.BooleanField(default=False)
    reviewer = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

@receiver(post_save, sender=User)
def create_merit_user(sender, instance, created, **kwargs):
    if created:
        MeritUser.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_merit_user(sender, instance, **kwargs):
    instance.merituser.save()
