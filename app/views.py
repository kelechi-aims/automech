"""
This is the views file for all functions  as they are linked to urls mapping
"""
from django.shortcuts import render
from django.http import HttpResponse
from .models import Location

def home_view(request):
    return render(request, 'home.html')

def about_view(request):
    '''
    This displays the page with the information about the authors
    '''
    return render(request, 'about.html')

def search_view(request):
    '''
    This displays the locations and type of services offered
    '''
    locations = Location.objects.all()
    return render(request, 'search.html', {'locations': locations})

def register_view(request):
    '''
    This is a logic for registration
    '''
    return HttpResponse('This is the registration page')

def login_view(request):
    '''
    This is a logic for loging in
    '''
    return render(request, 'login.html')

def mechanic_register_view(request):
    '''
    This displays the registration form for mechanics
    '''
    return render(request, 'mech_register.html')

def user_register_view(request):
    '''
    This displays the logic function for users, that is, car owners to register
    '''
    return render(request, 'car_register.html')
