import { createContext, useState } from "react";

export const UserDetailsContext = createContext(null);

export const UserDetailsProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);

    return (
        <UserDetailsContext.Provider
            value={{ userDetails, setUserDetails }}
        >
            {children}
        </UserDetailsContext.Provider>
    );
};