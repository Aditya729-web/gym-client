import express from "express";
import { apiRouter } from "../server/router";

const app = express();
app.use(express.json());

// Vercel serverless function entry points usually mount the route under /api
app.use("/api", apiRouter);

// Fallback in case Vercel rewrites it without /api
app.use("/", apiRouter);

export default app;
