#!/usr/bin/python3

from django import forms
from models import User  # Import your custom User model
from django.contrib.auth.forms import UserCreationForm


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'phone_number', 'profile_picture')
        # Include additional fields as needed
