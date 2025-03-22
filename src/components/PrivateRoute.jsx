import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");

    console.log("PrivateRoute check - Token found:", token); // Debugging

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
