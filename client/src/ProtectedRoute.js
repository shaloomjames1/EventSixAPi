import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    const session = JSON.parse(localStorage.getItem('session'));

    if (!session) {
        return <Navigate to="/login" />;
    }

    if (session.userrole !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
