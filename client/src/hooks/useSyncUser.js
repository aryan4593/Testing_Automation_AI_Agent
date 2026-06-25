import { useContext, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { UserDetailsContext } from "../context/userDetailContext";

const useSyncUser = () => {
    const { user, isLoaded } = useUser();
    const { setUserDetails } = useContext(UserDetailsContext);
    useEffect(() => {
        if (!isLoaded || !user) return;

        const syncUser = async () => {
            try {
               const res = await axios.post("http://localhost:5000/api/users/sync", {
                    clerkId: user.id,
                    email: user.primaryEmailAddress?.emailAddress,
                    name: user.fullName,
                    username: user.username,

                });
                setUserDetails(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        syncUser();
    }, [user, isLoaded]);
};

export default useSyncUser;