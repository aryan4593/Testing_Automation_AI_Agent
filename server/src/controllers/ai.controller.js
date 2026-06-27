import { buildRepositoryContext } from "../services/repository.service.js";
import { generateTestCases } from "../services/llm.service.js";
import { saveTestCases } from "../services/testcase.service.js";
import TestCases from "../models/TestCases.js";
export const generateTestCasesController = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required",
            });
        }

        // 1. Build Repository Context
        const { project,repoContext, } = await buildRepositoryContext(projectId);

        // 2. Generate AI Test Cases
        const testCases = await generateTestCases({
            owner: project.owner,
            repo: project.name,
            branch: project.defaultBranch,
            repoContext,
        });
        // console.log(testCases);
        // 3. Save Test Cases
        const savedTestCases = await saveTestCases({
            project,
            testCases,
        });

        // console.log(savedTestCases);
        
        // 4. Return Response
        return res.status(200).json({
            success: true,
            message: "Test cases generated successfully.",
            count: savedTestCases.length,
            testCases: savedTestCases,
        });

    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTestCases = async (req, res)=>{
    try {
        const { projectId } = req.params;

        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required.",
            });
        }
        const testCases = await TestCases.find({ projectId });
        return res.status(200).json({
            success: true,
            exists: testCases.length > 0,
            count: testCases.length,
            testCases,
        });

    } 
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}