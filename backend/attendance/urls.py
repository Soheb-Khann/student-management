from rest_framework.routers import DefaultRouter

from .views import AttendanceSessionViewSet

router = DefaultRouter()

router.register(
    'attendance',
    AttendanceSessionViewSet,
    basename='attendance'
)

urlpatterns = router.urls