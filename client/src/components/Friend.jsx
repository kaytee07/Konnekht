import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const { friends } = useSelector((state) => state.user);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId)

  const patchFriend = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
      method: "PATCH" ,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data = await response.json;
    dispatch(setFriends({ friends: data }))
  }
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
        <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem"
        }}>
            <Box
              OnClic
            >

            </Box>
        </Box>
    </Box>
  )
}

export default Friend;
