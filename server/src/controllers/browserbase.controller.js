import Project from "../models/Project.js";

import { createBrowserbaseSession } from "../services/browserbase.service.js";
import { connectBrowser } from "../services/playwright.service.js";
import { executeBrowserbaseScript } from "../services/scriptExecutor.service.js";
import { generateAutomationScript } from "../services/automation.service.js";

import {
  getTestCaseById,
  updateTestCase,
} from "../services/testcase.service.js";

import {
  buildRepositoryContext,
} from "../services/repository.service.js";

export const runTestCase = async (req, res) => {

  let browser;
  let page;
  let logs = [];
  let session;
  let testCase;

  try {

    const { testCaseId } = req.params;

    if (!testCaseId) {
      return res.status(400).json({
        success: false,
        message: "Test Case ID is required.",
      });
    }

    // 1. Fetch Test Case

    testCase = await getTestCaseById(testCaseId);

    if (!testCase) {
      return res.status(404).json({
        success: false,
        message: "Test Case not found.",
      });
    }

    // 2. Fetch Project

    const project = await Project.findById(testCase.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // 3. Repository Context

    const { repoContext } = await buildRepositoryContext(project._id);

    // 4. Generate Automation Script

    const script = await generateAutomationScript({
      testCase,
      project,
      repoContext,
      baseUrl: project.targetDomain,
    });

    const startedAt = Date.now();

    await updateTestCase(testCase._id, {
      browserbaseScript: script,
      status: "Running",
      logs: [],
    });

    // 5. Browserbase Session

    session = await createBrowserbaseSession();

    // 6. Connect Playwright

    const connection = await connectBrowser(session);

    browser = connection.browser;
    page = connection.page;
    logs = connection.logs;

    console.log("page title-", await page.title());

    // 7. Execute Generated Script

    await executeBrowserbaseScript({
      script,
      page,
    });

    const endedAt = Date.now();

    await updateTestCase(testCase._id, {
      status: "Passed",
      logs,
      sessionId: session.id,
      sessionUrl: `https://www.browserbase.com/sessions/${session.id}`,
      executionTime: endedAt - startedAt,
    });

    return res.json({
      success: true,
      message: "Test executed successfully.",
      status: "passed",
      logs,
      sessionId: session.id,
      sessionUrl: `https://www.browserbase.com/sessions/${session.id}`,
      browserbaseScript: script,
    });

  } catch (error) {

    console.error(error);

    logs.push({
      type: "exception",
      text: error.stack || error.message,
      timestamp: new Date().toISOString(),
    });

    if (testCase) {
      try {
        await updateTestCase(testCase._id, {
          status: "Failed",
          logs,
          sessionId: session?.id || "",
          sessionUrl: session
            ? `https://www.browserbase.com/sessions/${session.id}`
            : "",
        });
      } catch (updateError) {
        console.error("Failed to persist test case failure state:", updateError);
      }
    }

    return res.status(500).json({
      success: false,
      message: error.message,
      status: "failed",
      logs,
      sessionId: session?.id || "",
      sessionUrl: session
        ? `https://www.browserbase.com/sessions/${session.id}`
        : "",
      error: error.message,
    });

  } finally {

    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Failed to close browser cleanly:", closeError);
      }
    }

  }

};