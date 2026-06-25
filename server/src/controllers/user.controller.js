import User from "../models/User.js";

export const syncUser = async (req, res) => {
    // console.log("request on sync user~");
    try {
        const { clerkId, email, name, username } = req.body;
        // console.log(clerkId);
        let user = await User.findOne({ email });
        
        if (!user) {
            user = await User.create({
                clerkId,
                email,
                name,
                username
            });
        }

        return res.status(200).json(user);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
};