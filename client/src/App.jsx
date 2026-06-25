import { Routes, Route } from "react-router-dom";
import useSyncUser from "./hooks/useSyncUser";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import { SignIn,SignUp } from "@clerk/clerk-react";

function App() {
    useSyncUser();
    return (
        <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path="/sign-in/*" element={<SignIn />} />
            <Route path="/sign-up/*" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default App;