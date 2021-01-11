from django.contrib.auth.models import User

from .models import MeritUser

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

class MeritUserForm(forms.ModelForm):
    class Meta:
        model = MeritUser
        fields = ('student', 'recommender', 'counselor', 'reviewer', 'admin')