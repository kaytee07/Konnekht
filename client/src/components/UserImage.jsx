import { Box } from "@mui/material"

const UserImage = ({ image, size = "60px"}) => {
  return (
    <Box
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image ? `http://localhost:3001/assets/${image}` : `http://localhost:3001/assets/default-prof.jpeg`}
        component="img"
    >

    </Box>
  );
};

export default UserImage;
