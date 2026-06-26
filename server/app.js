import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/user.routes.js";
import githubRoutes from "./src/routes/github.routes.js";
import projectRoutes from "./src/routes/project.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend Running"
    });
});

export default app;