import axios from "axios";
const BACKEND_ROUTE = import.meta.env.VITE_BACKEND_ROUTE;

export const updateTestCase = async (testCaseId, data) => {
  const response = await axios.put(
    `${BACKEND_ROUTE}/testcases/${testCaseId}`,
    data
  );

  return response.data;
};