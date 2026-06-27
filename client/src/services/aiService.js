import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_ROUTE;

export const generateTestCases = async (projectId) => {
    const response = await axios.post(
        `${BACKEND_URL}/ai/generate-testcases/${projectId}`
    );
    return response.data;
};

export const getTestCases = async(projectId) => {
    const res = await axios.get(
        `${BACKEND_URL}/ai/get-test-cases/${projectId}`
    );

    return res.data;
}