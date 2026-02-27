import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    allowedRoles = [],
}) => {
    const { user, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const userRole = user.role ? user.role.toLowerCase() : 'user';
    const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());

    // Eğer roller belirtilmişse ve kullanıcının rolü listede yoksa
    if (normalizedAllowed.length > 0 && !normalizedAllowed.includes(userRole)) {
        // Role göre fallback dashboard veya ana sayfa
        if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (userRole === 'expert') return <Navigate to="/expert/dashboard" replace />;
        return <Navigate to="/user/dashboard" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

