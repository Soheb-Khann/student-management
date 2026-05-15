from rest_framework.routers import DefaultRouter

from .views import FeeRecordViewSet

router = DefaultRouter()

router.register(
    'fees',
    FeeRecordViewSet,
    basename='fees'
)

urlpatterns = router.urls