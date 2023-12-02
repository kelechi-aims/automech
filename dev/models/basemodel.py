#!/usr/bin/python3
"""
BaseModel file
"""
from django.db import models
from uuid import uuid4
from datetime import datetime

class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        super().save(*args, **kwargs)

    def to_dict(self):
        model_dict = {}
        for field in self._meta.fields:
            if isinstance(field, models.DateTimeField):
                value = getattr(self, field.name).strftime("%Y-%m-%dT%H:%M:%S.%f")
            else:
                value = getattr(self, field.name)
            model_dict[field.name] = value
        return model_dict

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
