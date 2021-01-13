from django.urls import path

from . import views

urlpatterns = [
    path('', views.MeritUserCreate.as_view(), name='users'),
]