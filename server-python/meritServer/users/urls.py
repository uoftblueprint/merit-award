from django.urls import path

from . import views

urlpatterns = [
    path('', views.MeritUserView.as_view(), name='users'),
    path('create', views.MeritUserCreateView.as_view())
]