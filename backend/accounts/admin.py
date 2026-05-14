from django.contrib import admin
from .models import User, Teacher

# Register models to make them accessible in the Django admin interface

admin.site.register(User)
admin.site.register(Teacher)