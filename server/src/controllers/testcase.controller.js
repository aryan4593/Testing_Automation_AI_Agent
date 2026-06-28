import { updateTestCase } from "../services/testcase.service.js";

export const updateTestCaseController = async (req, res) => {
  try {
    const { testCaseId } = req.params;

    const {
      title,
      description,
      targetRoute,
      expectedResult,
    } = req.body;

    const updatedTestCase = await updateTestCase(
      testCaseId,
      {
        title,
        description,
        targetRoute,
        expectedResult,
      }
    );

    if (!updatedTestCase) {
      return res.status(404).json({
        success: false,
        message: "Test case not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Test case updated successfully.",
      testCase: updatedTestCase,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};