from rest_framework.routers import DefaultRouter
from .views import AttendanceSessionViewSet, SubmitAttendanceView
from django.urls import path

router = DefaultRouter()

router.register(
    'attendance',
    AttendanceSessionViewSet,
    basename='attendance'
)

urlpatterns = router.urls + [
    path(
        'attendance-submit/',
        SubmitAttendanceView.as_view()
    ),
]