from django.contrib import admin
from .models import MeritUser

@admin.register(MeritUser)
class MeritUserAdmin(admin.ModelAdmin):
    pass