import axios from "axios";

const BACKEND_ROUTE = import.meta.env.VITE_BACKEND_ROUTE;

export const getRepositories = async (clerkId) => {
    const response = await axios.get(
        `${BACKEND_ROUTE}/github/repos`,
        {
            params: {
                clerkId,
            },
        }
    );
    return response.data;
};
