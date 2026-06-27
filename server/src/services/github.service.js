import axios from "axios"
import { isUsefulFile } from "../utils/githubFilter.js";


export const getRepoTree = async (owner, repo, branch="main", githubToken)=>{
    try {

        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
            {
                headers: {
                    Authorization: `Bearer ${githubToken}`,
                    Accept: "application/vnd.github+json",
                },
            }
        );
        const tree = response.data.tree;
        // console.log(tree);
        return tree
        .filter((item) => item.type === "blob")
        .filter((item) => isUsefulFile(item.path));
        // .slice(0, 25);


    } catch (err) {
        console.log(err);
        return null;
    }
}

export const readGithubFile = async (owner, repo, path, branch = "main", githubToken)=>{
    try {
        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
            {
                headers: {
                    Authorization: `Bearer ${githubToken}`,
                    Accept: "application/vnd.github+json",
                },
            }
        );

        if(!response.data) return null;

        const decodedContent = await Buffer.from(response.data.content,"base64").toString("utf8");
        return { path, content: decodedContent.slice(0, 5000) };
    }
    catch (error) {
        console.log(error.message);
        console.log(`Unable to read ${path}`);

        return null;
    }
}