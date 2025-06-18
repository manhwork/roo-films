import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteConfig } from '../../constants';

interface ProtectRouteProps {
    children: ReactNode;
}

export const ProtectRoute = ({ children }: ProtectRouteProps) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token || !user) {
        return <Navigate to={RouteConfig.LoginPage.path} />;
    }
    return <>{children}</>;
};
