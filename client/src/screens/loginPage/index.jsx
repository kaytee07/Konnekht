import { Box, useTheme, useMediaQuery, Typography } from "@mui/material"
import Form from "./Form";

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            <Box 
                backgroundColor={ theme.palette.background.alt } 
                p="1rem 6%" 
                textAlign="center"
            >
                <Typography
                    fontWeight= "bold"
                    fontSize="32px"
                    color="primary"
                    sx={{
                        "&: hover": {
                            color: theme.palette.primary.light,
                            cursor: "pointer"
                        }
                    }}
                >
                    Konnekht
                    
                </Typography>
            </Box>
            <Box 
                width={ isNonMobileScreens ? "50%" : "93%"}
                m="2rem auto"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem", justifyContent: "center", display:"flex" }} p={2}>
                    Hello, Welcome to Konnekht
                </Typography>
                <img src="../../assets/linkedin.png" alt="" />
                <Form/>

            </Box>
        </Box>
    )
}

export default LoginPage;