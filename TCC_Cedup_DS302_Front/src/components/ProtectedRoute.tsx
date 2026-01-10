import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const id = localStorage.getItem('idUser');

    if (!id) return <Navigate to="/login" />;

    return children;
}

export default ProtectedRoute;