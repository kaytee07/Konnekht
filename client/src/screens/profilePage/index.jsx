import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "..//widgets/UserWidget";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json();
        setUser(data);
    }

    useEffect(()=> {
        getUser();

    }, [])
    return (
        <Box>
            
            <Navbar />
            {
                user && (
                    <Box
              width="100%"
              padding="2rem 0%"
              display={isNonMobileScreens ? "flex" : "block"}
              gap="0.5rem"
              justifyContent="space-between"
            >
                <Box  
                    flexBasis={isNonMobileScreens ? "25%" : undefined} 
                    width={isNonMobileScreens ? undefined : "96%"} 
                    margin={isNonMobileScreens ? undefined: "2rem auto"}
                    >
                 <UserWidget userId={userId} picturePath={user.profilePicturePath}/>
                 <Box m="2rem 0" />
                 <FriendListWidget userId={userId}/>
                </Box>
                <Box  
                 flexBasis={isNonMobileScreens ? "42%" : undefined}
                 mt={isNonMobileScreens ? undefined : "2rem"}
                 width={isNonMobileScreens ? undefined : "96%"}
                 margin={isNonMobileScreens ? undefined: "0px auto"}
                >
                    <MyPostWidget picturePath={user.profilePicturePath}/>
                    <Box m="2rem 0" />
                    <PostsWidget userId={userId} isProfile/>
                </Box>
            </Box>
                )
            }
        </Box>
    )
}

export default ProfilePage;