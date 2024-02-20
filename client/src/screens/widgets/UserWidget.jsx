import {
  //  ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    ManageAccountsOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Stack, Grid, useMediaQuery} from "@mui/material";
import UserImage from  "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
//import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const UserWidget = ({ userId, picturePath }) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    // const token = useSelector((state) => state.token);
    // const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        console.log(userId)
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            credentials: "include"
        })

        const userData = await response.json();
        setUser(userData);
    }

    useEffect(() => {
        getUser();
    }, []);

    if (!user) {
        return null
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user;

  return (
    <WidgetWrapper>
        {/* FIRST ROW */}
        <Grid container
            gap="0.5rem"
            pb="1.1rem"
            display="flex"
            flexDirection="column"
            onClick={() => navigate(`/profile/${userId}`)}
        >
            <Grid item display="flex" justifyContent="space-between">
                <Stack direction="row">
                    <UserImage image={picturePath}>

                    </UserImage>
                    <Stack direction="column" spacing={1}>
                        <Box>
                            <Typography
                                variant="h4"
                                color="dark"
                                fontWeight="500"
                                sx= {{ 
                                    "&: hover": {
                                        color: palette.primary.light,
                                        cursor: "pointer"
                                    }
                                 }}
                            >
                                {firstName} {lastName}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography color={medium}>
                                 {friends.length} {friends.length > 1 ? "friends": "friend"}
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>
                <ManageAccountsOutlined/>
            </Grid>
            <Divider/>
            {/* SECOND ROW */}
            <Grid item p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }}/>
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    < WorkOutlineOutlined fontSize="large" sx={{ color: main }}/>
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Grid>
             <Divider/>
            {/* THIRD ROW */}
            <Grid item p="1rem 0">
                <Box display="flex" justifyContent="space-between" flexDirection="row">
                    <Typography color={medium}> {`who's viewed your profile`}</Typography>
                    <Typography color={main} fontWeight="500">
                        {viewedProfile}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" flexDirection="row">
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography color={main} fontWeight="500">
                        {impressions}
                    </Typography>
                </Box>
            </Grid>
             <Divider/>
            {/* FOURTH ROW */}
            <Grid item p="1rem 0">
                <Typography fontSize="1rem" color="main" fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>
                <Stack direction="column" display="flex" gap="0.5rem">
                     <Box display="flex"  justifyContent="space-between">
                        <Box display="flex" gap="0.5rem" alignItems="center">
                           <img src="https://res.cloudinary.com/dbyubqmb0/image/upload/v1707736151/twitter_sytsfl.png" alt="twitter" width="25px" height="25px"/>
                            <Box  display="flex" flexDirection="column">
                                <Typography color={main} fontWeight="500">
                                    Twitter
                                </Typography>
                                <Typography color={medium}>
                                     Social Network
                                </Typography>
                            </Box>
                        </Box>
                        <EditOutlined sx={{ color: main }}/>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex" gap="0.5rem" alignItems="center">
                           <img src="https://res.cloudinary.com/dbyubqmb0/image/upload/v1707736142/linkedin_kprftp.png" alt="twitter" width="25px" height="25px"/>
                            <Box  display="flex" flexDirection="column">
                                <Typography color={main} fontWeight="500">
                                    LinkedIn
                                </Typography>
                                <Typography color={medium}>
                                    Network Platform
                                </Typography>
                            </Box>
                        </Box>
                        <EditOutlined sx={{ color: main }}/>
                    </Box>
                </Stack>
            </Grid>   
        </Grid>
    </WidgetWrapper>
  )
};

export default UserWidget;
