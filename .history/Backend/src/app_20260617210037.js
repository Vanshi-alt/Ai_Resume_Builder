import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import aiRoutes from "./routes/ai.routes.js";   
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/ai", aiRoutes);
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);

export default app;
