// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { errorHandler } from "./middlewares/error.middleware.js";

// dotenv.config(); // MUST be first

// const app = express();

// /* Global Middlewares */
// app.use(cors());
// app.use(express.json());
// app.use(errorHandler);
// /* Health Check */
// app.get("/health", (req, res) => {
//     res.status(200).json({ status: "OK" });
// });
// /* Placeholder for routes */
// export default app;
import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

// 🔐 AUTH ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);

export default app;

