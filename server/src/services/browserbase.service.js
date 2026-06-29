import Browserbase from "@browserbasehq/sdk";

const browserbase = new Browserbase({
  apiKey: process.env.BROWSERBASE_API_KEY,
});

export const createBrowserbaseSession = async () => {
  const session = await browserbase.sessions.create({
    projectId: process.env.BROWSERBASE_PROJECT_ID,
  });

  console.log("Browserbase Session Created:");
  // console.dir(session, { depth: null });

  return session;
};

export default browserbase;