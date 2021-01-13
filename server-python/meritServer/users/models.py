from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from pdb import set_trace


class UserType(models.Model):
  STUDENT = 1
  RECOMMENDER = 2
  COUNSELOR = 3
  REVIEWER = 4
  ADMIN = 5
  ROLE_CHOICES = (
      (STUDENT, 'student'),
      (RECOMMENDER, 'recommender'),
      (COUNSELOR, 'counselor'),
      (REVIEWER, 'reviewer'),
      (ADMIN, 'admin'),
  )

  id = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, primary_key=True)

  def __str__(self):
      return self.get_id_display()


class MeritUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    user_types = models.ManyToManyField(UserType)

@receiver(post_save, sender=User)
def create_merit_user(sender, instance, created, **kwargs):
    if created:
        MeritUser.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_merit_user(sender, instance, **kwargs):
    instance.merituser.save()
