import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import cookieParser from 'cookie-parser';
import Post from "./models/Post.js";
import User from "./models/User.js";
import { posts, users } from "./data/index.js";

//CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url); // so we can grab file url specificall when we use modules
const __dirname = path.dirname(__filename); // only when we use filename: for determining current file absolute path
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
// app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
app.use(cookieParser());


// FILE STORAGE
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => {
    console.log(`${error} did not connect`)
});

