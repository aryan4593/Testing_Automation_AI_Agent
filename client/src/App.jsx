import { Routes, Route } from "react-router-dom";
import { SignIn,SignUp } from "@clerk/clerk-react";
import useSyncUser from "./hooks/useSyncUser";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import WorkSpace from "./pages/WorkSpace";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    useSyncUser();
    return (
        <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path="/sign-in/*" element={<SignIn />} />
            <Route path="/sign-up/*" element={<SignUp />} />
            <Route path="/workspace" element={
                <ProtectedRoute> 
                    <WorkSpace />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default App;