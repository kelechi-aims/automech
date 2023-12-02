#!/usr/bin/python3
"""
form for carowners
"""

from django.shortcuts import render, redirect
from .forms import CarOwnerRegistrationForm


def car_owner_registration_view(request):
    if request.method == 'POST':
        form = CarOwnerRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            # Redirect after successful registration
            return redirect('success_url_name') 
            # Replace 'success_url_name' with your desired URL
    else:
        form = CarOwnerRegistrationForm()
    return render(request, 'registration/car_owner_registration.html', {'form': form})
