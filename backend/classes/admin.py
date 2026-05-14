from django.contrib import admin
from .models import SchoolClass, Subject, ClassAssignment

# Register models to make them accessible in the Django admin interface

admin.site.register(SchoolClass)
admin.site.register(Subject)
admin.site.register(ClassAssignment)