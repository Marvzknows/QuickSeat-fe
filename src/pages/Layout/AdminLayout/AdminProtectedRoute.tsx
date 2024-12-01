import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    //   const isAuthenticated = localStorage.getItem('authToken');
    const isValid = true;

    if (!isValid) {
        return <Navigate to="/" replace />; // Redirect to login if not authenticated
    }

    return <Outlet />; // If authenticated, render child routes
};

export default ProtectedRoute;
