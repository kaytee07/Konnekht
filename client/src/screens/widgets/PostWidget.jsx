import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import  Friend  from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";

const PostWidget = ({
     _id,
    postUserId,
    firstName,
    lastName,
    description,
    location,
    occupation,
    picturePath,
    userPicture,
    likes,
    comments
    }) => {
        const [isComments, setIsComments] = useState(false);
         const dispatch = useDispatch();
         const { token } = useSelector((state) => state.token);
         const loggedInUserId = useSelector((state)=> state.user._id);
         const isLiked =Boolean(likes[loggedInUserId]);
         const likeCount = Object.keys(likes).length;
         const name = `${firstName} ${lastName}`;

        
         const { palette } = useTheme();
         const main = palette.neutral.main;
         const primary = palette.primary.main

         const patchLike = async() => {
            const response= await fetch(`http://localhost:3001/posts/${_id}/like`, {
                method: "PATCH",
                "Content-Type": "application/json",
                credentials: "include"
            });

            const updatedPost = await response.json();
            console.log(updatedPost)
            dispatch(setPost({ post: updatedPost }));
         }

         return (
            <WidgetWrapper m="2rem 0">
                <Friend 
                    friendId={postUserId}
                    name={name}
                    subtitle={location}
                    userPicturePath={userPicture}
                />
                <Typography color={main} sx={{ mt:"1rem" }}>
                    {description}
                </Typography>
                {
                    picturePath && (
                        <img
                            width="100%"
                            height="auto"
                            alt="post"
                            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                            src={`http://localhost:3001/assets/${picturePath}`}
                        />
                    )
                }
                <Box
                 display="flex"
                 justifyContent="space-between"
                 alignItems="center"
                >
                     <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                     >
                        {/* lIKES */}
                         <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          >
                            <IconButton onClick={patchLike}>
                                {isLiked ? (
                                    <FavoriteOutlined sx={{ color: primary }}/>
                                ): (
                                    <FavoriteBorderOutlined/>
                                )}

                            </IconButton>
                            <Typography>{likeCount}</Typography>
                          </Box>
                           <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                           >
                             <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                gap="0.3rem"
                            >
                                <IconButton onClick={() => setIsComments(true)}>
                                    <ChatBubbleOutlineOutlined/>
                                </IconButton>
                                <Typography>
                                    { comments && comments.length}
                                </Typography>
                            </Box>
                           </Box>
                           <IconButton>
                            <ShareOutlined/>
                           </IconButton>
                     </Box>    
                     {isComments && (
                        <Box>
                            {comments && comments.map((comment, i) => (
                                <Box key={`${name}-${i}`}>
                                    <Divider />
                                    <Typography
                                    sx={{
                                        color: main,
                                        m: "0.5rem"
                                    }}
                                    >
                                        {comment}
                                    </Typography>
                                </Box>
                            ))}
                            <Divider/>
                        </Box>
                     )}  
                </Box>
            </WidgetWrapper>
         );
    }
export default PostWidget;