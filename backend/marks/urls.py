from rest_framework.routers import DefaultRouter

from .views import MarkRecordViewSet

router = DefaultRouter()

router.register(
    'marks',
    MarkRecordViewSet,
    basename='marks'
)

urlpatterns = router.urls