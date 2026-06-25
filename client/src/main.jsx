import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import App from "./App";
import { UserDetailsProvider } from "./context/userDetailContext";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
    <ClerkProvider publishableKey={clerkPubKey}>
        <BrowserRouter>
            <UserDetailsProvider>
                <App />
            </UserDetailsProvider>
        </BrowserRouter>
    </ClerkProvider>
);