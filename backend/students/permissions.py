from rest_framework.permissions import BasePermission, SAFE_METHODS


class StudentPermission(BasePermission):

    def has_permission(self, request, view):

        user = request.user

        # Must be logged in first
        if not user or not user.is_authenticated:
            return False

        # Read permissions
        if request.method in SAFE_METHODS:
            return user.is_authenticated

        # Write permissions
        return user.role in ['admin', 'teacher']