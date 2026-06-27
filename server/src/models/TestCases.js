import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema(
    {
        // Relations
        userId: {
            type: String,
            required: true,
            index: true,
        },

        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
            index: true,
        },

        // Repository Details
        repoId: {
            type: Number,
            required: true,
        },

        repoName: {
            type: String,
            required: true,
        },

        repoOwner: {
            type: String,
            required: true,
        },

        branch: {
            type: String,
            default: "main",
        },

        // Main Test Case
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Medium",
        },

        // AI Metadata
        targetRoute: {
            type: String,
            default: "",
        },

        targetFiles: [
            {
                type: String,
            },
        ],

        expectedResult: {
            type: String,
            default: "",
        },

        // Browserbase / Playwright
        browserbaseScript: {
            type: String,
            default: "",
        },

        // Execution
        status: {
            type: String,
            enum: [
                "generated",
                "running",
                "passed",
                "failed",
            ],
            default: "generated",
        },
    },
    {
        timestamps: true,
    }
);

testCaseSchema.index({
    projectId: 1,
    status: 1,
});

export default mongoose.model("TestCase", testCaseSchema);