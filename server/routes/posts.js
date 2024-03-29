import express, { Router } from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

/* READ */
const postRoutes = express.Router();
postRoutes.get("/", verifyToken, getFeedPosts);
postRoutes.get("/:userid", verifyToken, getUserPosts);


/* UPDATES */
postRoutes.patch("/:id/like", verifyToken, likePost);

export default postRoutes;



