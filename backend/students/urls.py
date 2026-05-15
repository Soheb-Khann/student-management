from rest_framework.routers import DefaultRouter
from .views import StudentViewSet
from .views import StudentViewSet, ProgressRecordViewSet

router = DefaultRouter()

router.register('students', StudentViewSet, basename='students')
router.register('progress', ProgressRecordViewSet, basename='progress')
urlpatterns = router.urls

