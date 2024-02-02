import Post from "../models/Post";
import User from "../models/User";


/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath, location } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            userPicturePath: user.picturePath,
            picturePath,
            description,
            location,
            likes: {},
            comment: [],
        })
        await newPost.save()
        const post = Post.find();
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

};

export const getFeedPosts = async (req, res) => {
    try {
        const feed = Post.find();
        res.status(200).json(feed);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const userPosts = Post.find({ userId });
        res.status(200).json(userPosts);
    } catch(error) {
         res.status(404).json({ message: error.message });
    }
}

export const likePost = async () => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost  = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true } 
        );

        res.status(200).json(updatedPost);
    } catch {
        res.status(404).json({ message: error.message });
    }
}