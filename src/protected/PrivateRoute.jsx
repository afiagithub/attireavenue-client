import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();
    if (loading) {
        return <div className="text-center flex flex-col items-center justify-center h-[100vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    }
    if (user) {
        return <div>
            {children}
        </div>
    }


    return <Navigate to="/login" state={location?.pathname || '/'} />
};

export default PrivateRoute;