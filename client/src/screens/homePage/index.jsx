import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserWidget from "../../screens/widgets/UserWidget";
import MyPostWidget from "../../screens/widgets/MyPostWidget";
import PostsWidget from "../../screens/widgets/PostsWidget";
import AdvertWidget from "../../screens/widgets/AdvertWidget";
import FriendListWidget from "../../screens/widgets/FriendListWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const {_id, profilePicturePath } = useSelector((state) => state.user)
    return (
        <Box>
            <Navbar />
            <Box
              width="100%"
              padding="2rem 0%"
              display={isNonMobileScreens ? "flex" : "block"}
              gap="0.5rem"
              justifyContent="space-between"
            >
                <Box  flexBasis={isNonMobileScreens ? "25%" : "85%" } width={isNonMobileScreens ? undefined : "96%"} margin={isNonMobileScreens ? undefined: "0px auto"}>
                 <UserWidget userId={_id} picturePath={profilePicturePath}/>
                </Box>
                <Box  
                 flexBasis={isNonMobileScreens ? "42%" : undefined}
                 mt={isNonMobileScreens ? undefined : "2rem"}
                 width={isNonMobileScreens ? undefined : "95%"} 
                 margin={isNonMobileScreens ? undefined: "2rem auto"}
                >
                    <MyPostWidget picturePath={profilePicturePath} />
                    <PostsWidget userId={_id} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <AdvertWidget/>
                        <Box m="2rem 0">
                            <FriendListWidget userId={_id}/>
                        </Box>
                    </Box>
                )}
                
            </Box>
        </Box>
    )
}

export default HomePage;