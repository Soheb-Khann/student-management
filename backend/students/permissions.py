from rest_framework.permissions import BasePermission, SAFE_METHODS


class StudentPermission(BasePermission):

    def has_permission(self, request, view):

        user = request.user

        # Read permissions
        if request.method in SAFE_METHODS:
            return user.is_authenticated

        # Write permissions
        return user.role in ['admin', 'teacher']