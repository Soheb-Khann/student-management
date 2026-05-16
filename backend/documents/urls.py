from rest_framework.routers import DefaultRouter

from .views import StudentDocumentViewSet

router = DefaultRouter()

router.register(
    'documents',
    StudentDocumentViewSet,
    basename='documents'
)

urlpatterns = router.urls