import { Routes, Route, useLocation } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import useSyncUser from "./hooks/useSyncUser";
import Home from "./pages/Home";
import WorkSpace from "./pages/WorkSpace";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    useSyncUser();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirectUrl = queryParams.get("redirect_url") || "/workspace";

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/sign-in/*"
                element={
                    <SignIn
                        routing="path"
                        signUpUrl="/sign-up"
                        forceRedirectUrl={redirectUrl}
                    />
                }
            />
            <Route
                path="/sign-up/*"
                element={
                    <SignUp
                        routing="path"
                        signInUrl="/sign-in"
                        forceRedirectUrl={redirectUrl}
                    />
                }
            />
            <Route
                path="/workspace"
                element={
                    <ProtectedRoute>
                        <WorkSpace />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;