import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_ROUTE;

export const runTestCase = async (
  testCaseId,
  {
    mode = "cache",
    baseUrl = "",
    customPrompt = "",
  } = {}
) => {
  const response = await axios.post(
    `${BACKEND_URL}/browserbase/run/${testCaseId}`,
    {
      mode,
      baseUrl,
      customPrompt,
    }
  );

  return response.data;
};
