from django.urls import path
from .views import login_view

urlpatterns = [
    # Other URL patterns...
    path('login/', login_view, name='login'),
    # Other URL patterns...
]
