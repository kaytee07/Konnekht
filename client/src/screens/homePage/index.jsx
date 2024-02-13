import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserWidget from "../../screens/widgets/UserWidget";
import MyPostWidget from "../../screens/widgets/MyPostWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const {_id, picturePath } = useSelector((state) => state.user)
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
                <Box  flexBasis={isNonMobileScreens ? "25%" : undefined}>
                 <UserWidget userId={_id} picturePath={picturePath}/>
                </Box>
                <Box  
                 flexBasis={isNonMobileScreens ? "42%" : undefined}
                 mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                {isNonMobileScreens && (
                    <Box flexBasis="25%">
                    </Box>
                )}
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage;