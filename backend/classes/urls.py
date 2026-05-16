from rest_framework.routers import DefaultRouter

from .views import (
    SchoolClassViewSet,
    SubjectViewSet,
)

router = DefaultRouter()

router.register(
    'classes',
    SchoolClassViewSet
)

router.register(
    'subjects',
    SubjectViewSet
)

urlpatterns = router.urls