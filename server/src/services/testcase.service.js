import TestCase from "../models/TestCases.js";

export const saveTestCases = async ({project,testCases,}) => {

    const documents = (Array.isArray(testCases) ? testCases : [])
        .filter(Boolean)
        .map((testCase) => ({
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
            status: "Pending",
        }));

    try {
        if (documents.length === 0) {
            return [];
        }

        const insertedTestCases = await TestCase.insertMany(documents);
        return insertedTestCases;
    } 
    catch (err) {
        console.log(err.message);
        return [];
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