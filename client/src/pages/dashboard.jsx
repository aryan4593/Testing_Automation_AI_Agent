import {
    SignedIn,
    SignedOut,
    RedirectToSignIn,
} from "@clerk/clerk-react";

function Dashboard() {

    return (
        <>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>

            <SignedIn>
                <h1>Dashboard</h1>
            </SignedIn>
        </>
    );
}

export default Dashboard;