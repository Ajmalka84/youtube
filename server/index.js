import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import videoRoute from "./routes/video.js";
import commentRoute from "./routes/comment.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

//db connection
mongoose.connect(process.env.mongoose).then(() => {
  console.log("Database is connected");
}).catch((error) => {
  console.log(error);
});

app.use(express.json());
app.use(cookieParser())
app.use("/auth" , authRoute)
app.use("/user" , userRoute)
app.use("/video" , videoRoute)
app.use("/comment" , commentRoute)

app.listen(5500, () => console.log("server running on port 5500"));
