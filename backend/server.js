import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminroute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import aiRouter from "./routes/aiRoutes.js";



const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB & Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());


// API Routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/ai", aiRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.send("API WORKING Great");
});
console.log("Mongo URI:", process.env.MONGODB_URI);


// Start server
app.listen(port, () => console.log(`Server Started on port ${port}`));

