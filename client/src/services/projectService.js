import axios from "axios";

const BACKEND_ROUTE = import.meta.env.VITE_BACKEND_ROUTE;

export const addProject = async (clerkId, repo) => {
    const response = await axios.post(
        `${BACKEND_ROUTE}/projects/createProject`,
        {
            clerkId,
            repo,
        }
    );

    return response.data;
};