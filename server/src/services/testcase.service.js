import TestCase from "../models/TestCases.js";

export const saveTestCases = async ({project,testCases,}) => {

    const documents = testCases.map((testCase) => ({
        userId: project.userId,
        projectId: project._id,
        repoId: project.repoId,
        repoName: project.name,
        repoOwner: project.owner,
        branch: project.defaultBranch,
        title: testCase.title,
        description: testCase.description,
        type: testCase.type,
        priority: testCase.priority,
        targetRoute: testCase.targetRoute,
        targetFiles: testCase.targetFiles,
        expectedResult: testCase.expectedResult,
        status: "generated",
    }));

    try {
        const insertedTestCases = await TestCase.insertMany(documents);
        return insertedTestCases;
    } 
    catch (err) {
        console.log(err.message);
        return null;
    }
};


export const updateTestCase = async (testCaseId, updatedFields) => {
  return await TestCase.findByIdAndUpdate(
    testCaseId,
    updatedFields,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const getTestCaseById = async (testCaseId)=>{
  return await TestCase.findById(testCaseId);j
}