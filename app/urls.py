"""
This is the url mapping file for Automech Locator
"""
from django.contrib import admin
from django.urls import path, include

from . import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('search/', views.search_view, name='search'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('mechanic_register/', views.mechanic_register_view, name='mechanic_register'),
    path('user_register/', views.user_register_view, name='user_register'),
    # Additional URL patterns and their corresponding views
]
