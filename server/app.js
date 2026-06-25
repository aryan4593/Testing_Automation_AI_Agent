import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend Running"
    });
});

export default app;