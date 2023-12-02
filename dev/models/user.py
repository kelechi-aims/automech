#!/usr/bin/python3
"""
User
"""

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Add additional fields here
    is_car_owner = models.BooleanField(default=False)
    is_mechanic = models.BooleanField(default=False)
    # Add other fields relevant to your application's user model

    # Example additional fields:
    phone_number = models.CharField(max_length=20)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)

    # Car owner's address
    car_owner_address = models.CharField(max_length=255, blank=True, null=True)

    # Mechanic's location using GeoDjango's PointField
    mechanic_location = gis_models.PointField(
        null=True,
        blank=True,
        geography=True,
        verbose_name='Mechanic Location (Longitude, Latitude)'
    )
