import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isLoaded, isSignedIn } = useUser();
    const location = useLocation();

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-sm text-slate-200">
                    Checking your access...
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
        const redirectUrl = `${location.pathname}${location.search}`;
        return <Navigate to={`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`} replace />;
    }

    return children;
};

export default ProtectedRoute;