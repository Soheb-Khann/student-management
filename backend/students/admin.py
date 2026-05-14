from django.contrib import admin
from .models import Family, Student, ProgressRecord

admin.site.register(Family)
admin.site.register(Student)
admin.site.register(ProgressRecord)