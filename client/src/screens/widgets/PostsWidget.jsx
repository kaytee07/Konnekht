import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";


const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const [dataBack, setDataBack] = useState(false);

    const getPosts = async () => {
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            credentials: "include"
        });
        const data = await response.json();
        console.log(data)
        dispatch(setPosts({ posts: data }));
        if(data) setDataBack(true);
    }
    
    const getUserPosts = async () => {
        console.log(userId)
        const response = await fetch(`http://localhost:3001/posts/${userId}`, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();
        console.log(data)
        dispatch(setPosts({ posts: data}));
        if(data) setDataBack(true);
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []);

  return (
    <>
        {dataBack && posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    occupation,
                    picturePath,
                    userPicture,
                    likes,
                    comments
                })=> (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        firstName={firstName}
                        lastName={lastName}
                        description={description}
                        location={location}
                        occupation={occupation}
                        picturePath={picturePath}
                        userPicture={userPicture}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
    </>
  )
}

export default PostsWidget;

