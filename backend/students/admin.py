from django.contrib import admin
from .models import Family, Student

# Register models to make them accessible in the Django admin interface

admin.site.register(Family)
admin.site.register(Student)