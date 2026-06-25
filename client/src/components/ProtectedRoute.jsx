import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};

export default ProtectedRoute;