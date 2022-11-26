import { Navigate } from "react-router-dom";
import { getToken } from ".././useLocalStorage";
export const ProtectedRoute = ({ children }) => {
    if (!getToken()) {
        return <Navigate to="/login" />;
    }
    return children;
};