#!/usr/bin/python3
"""
Model
"""
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    # Add other fields and methods as needed

class Mechanic(models.Model):
    # Mechanic model fields

class Appointment(models.Model):
    # Appointment model fields
