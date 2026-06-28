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

export const getProjects = async (clerkId)=>{

    const response = await axios.get(
        `${BACKEND_ROUTE}/projects/`,
       {
            params: {
                clerkId
            }
       }
    ) 

    return response.data;
}

export const updateProjectSettings = async (projectId, data) => {
  const response = await axios.put(
    `${BACKEND_ROUTE}/projects/${projectId}/settings`,
    data
  );

  return response.data;
};