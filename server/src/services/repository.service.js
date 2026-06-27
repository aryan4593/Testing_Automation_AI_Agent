import Project from "../models/Project.js";
import User from "../models/User.js";
import {getRepoTree,readGithubFile,} from "./github.service.js";

export const buildRepositoryContext = async (projectId) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            throw new Error("Project not found");
        }
        const user = await User.findOne({_id : project.userId});

        if (!user) {
            throw new Error("User not found");
        }

        if (!user.githubConnected) {
            throw new Error("GitHub account not connected");
        }

        const repoFiles = await getRepoTree(  project.owner, project.name, project.defaultBranch, user.githubAccessToken);

        const fileContents = await Promise.all(
            repoFiles.map((file) =>
                    readGithubFile(project.owner, project.name,file.path,project.defaultBranch, user.githubAccessToken)
                )
        );

        const validFiles = fileContents.filter(Boolean);


        if (validFiles.length === 0) {
            throw new Error("No useful source files found");
        }


        const repoContext = validFiles.map( (file) => `
                File Path: ${file.path}
                File Content:
                ${file.content}`
        ).join("\n\n----------------------\n\n");

        return {
            project,
            user,
            files: validFiles,
            repoContext,
        };
        
    }
    catch (err) {
        throw err;
    }




}