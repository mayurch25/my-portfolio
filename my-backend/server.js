import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"

//routes
import authRoutes from "./routes/authRoutes.js"
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";

const app = express();

dotenv.config();

//middleware
app.use(cors());
app.use(express.json());

//db connection
connectDB();

//routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);


app.get('/', (req, res) => {
    res.send("welcome to my backend");
})

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`server is running at http://localhost:${port}/`)
})
