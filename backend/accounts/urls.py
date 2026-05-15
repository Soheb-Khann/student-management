from django.urls import path
from .views import CurrentUserView, ParentDashboardView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path(
        'login/',
        TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),

    path(
        'refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),
    path(
        'me/', 
        CurrentUserView.as_view()
    ),
    path(
        'parent-dashboard/',
        ParentDashboardView.as_view()
    ),
]

