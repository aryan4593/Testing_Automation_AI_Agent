import axios from "axios";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const githubLogin = (req, res) => {

    try {
        const { clerkId } = req.query;
        if (!clerkId) {
            return res.status(400).json({
                message: "Clerk ID is required",
            });
        }

        const state = jwt.sign(
            { clerkId },
            process.env.JWT_SECRET,
            {
                expiresIn: "10m",
            }
        );

        const params = new URLSearchParams({
            client_id: process.env.GITHUB_CLIENT_ID,
            redirect_uri: process.env.GITHUB_REDIRECT_URI,
            scope: "repo read:user",
            state,
        });

        return res.redirect(
            `https://github.com/login/oauth/authorize?${params.toString()}`
        );

    } 
    catch (error) {
        console.error(err);
        return res.status(500).json({
            message: err.message,
        });
    }
};




//
export const githubCallback = async (req, res) => {
    try {
        const { code,state } = req.query;

        
        if (!code) {
            return res.redirect(
                `${process.env.CLIENT_URL}/workspace?error=missing_code`
            );
        }
        const decoded = jwt.verify(
            state,
            process.env.JWT_SECRET
        );
        const clerkId = decoded.clerkId;
        console.log(clerkId);

        // Exchange code for access token
        const response = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        const accessToken = response.data.access_token;

        if (!accessToken) {
            return res.redirect(
                `${process.env.CLIENT_URL}/workspace?error=token_exchange_failed`
            );
        }

        console.log("GitHub Access Token:", accessToken);
        
        const githubUser = await axios.get(
            "https://api.github.com/user",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        console.log(githubUser.data);
        await User.findOneAndUpdate(
            { clerkId },
            {
                githubConnected: true,
                githubAccessToken: accessToken,
                githubUsername: githubUser.data.login,
                githubAvatar: githubUser.data.avatar_url,
            }
        );

        return res.redirect(`${process.env.CLIENT_URL}/workspace`);

    } catch (err) {
        console.error(err);

        return res.redirect(
            `${process.env.CLIENT_URL}/workspace?error=github_error`
        );
    }
};