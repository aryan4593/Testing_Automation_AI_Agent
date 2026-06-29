import { chromium } from "playwright-core";

export const connectBrowser = async (session) => {
  try {
    console.log("A. connectBrowser called");
    console.log("Connect URL:", session.connectUrl);

    const browser = await chromium.connectOverCDP(session.connectUrl);

    console.log("B. Connected");

    let context = browser.contexts()[0];

    if (!context) {
      context = await browser.newContext();
    }

    let page = context.pages()[0];

    if (!page) {
      page = await context.newPage();
    }

    const logs = [];

    const typeMap = {
      log: "log",
      info: "info",
      warning: "warning",
      warn: "warning",
      error: "error",
      debug: "log",
    };

    // Browser console logs
    page.on("console", (msg) => {
      const log = {
        type: typeMap[msg.type()] || "log",
        text: msg.text(),
        timestamp: new Date(),
      };

      console.log(`[${log.type.toUpperCase()}] ${log.text}`);

      logs.push(log);
    });

    // Uncaught JS errors
    page.on("pageerror", (error) => {
      const log = {
        type: "pageerror",
        text: error.message,
        timestamp: new Date(),
      };

      console.error("[PAGE ERROR]", error.message);

      logs.push(log);
    });

    // Failed network requests
    page.on("requestfailed", (request) => {
      const failure = request.failure();

      const log = {
        type: "network",
        text: `${request.method()} ${request.url()} - ${
          failure?.errorText || "Unknown Error"
        }`,
        timestamp: new Date(),
      };

      console.warn("[REQUEST FAILED]", log.text);

      logs.push(log);
    });

    return {
      browser,
      context,
      page,
      logs,
    };
  } catch (error) {
    console.error("Failed to connect browser:", error);
    throw error;
  }
};