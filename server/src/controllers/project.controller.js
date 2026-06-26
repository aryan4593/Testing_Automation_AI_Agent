import User from "../models/User.js";
import Project from "../models/Project.js";

export const createProject = async (req, res) => {

    try {
        const { clerkId, repo } = req.body;

        const user = await User.findOne({ clerkId });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const existingProject = await Project.findOne({
            userId: user._id,
            repoId: repo.id,
        });
        if (existingProject) {
            return res.status(409).json({
                message: "Project already exists",
            });
        }

        const project = await Project.create({
            userId: user._id,

            repoId: repo.id,
            name: repo.name,
            fullName: repo.fullName,
            private: repo.private,
            htmlUrl: repo.htmlUrl,
            description: repo.description,
            language: repo.language,
            updatedAtGithub: repo.updatedAt,
            defaultBranch: repo.defaultBranch,
            owner: repo.owner,
        });

        return res.status(201).json(project);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }

}


export const getProjects =async (req,res)=>{
    try {
        const { clerkId } = req.query;
        // console.log("getproject", clerkId);
        const user = await User.findOne({ clerkId });

        if(!user){
            return res.status(404).json({
                message: "User not found",
            });
        }

        const projects = await Project.find({
            userId: user._id,
        }).sort({ createdAt: -1 });

        return res.status(200).json(projects);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message,
        });

    }
}