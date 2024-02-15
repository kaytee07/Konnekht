import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery
} from "@mui/material";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch("http://localhost:3001/posts", {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
    }
        return (
            <WidgetWrapper>
                <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="column">
                    <Box display="flex" >
                        <UserImage image={picturePath}/>
                        <InputBase
                            placeholder="What's on your mind..."
                            onChange={(e) => setPost(e.target.value)}
                            value={post}
                            sx={{
                                width: "100%",
                                backgroundColor: palette.neutral.light,
                                borderRadius: "2rem",
                                padding: "1rem 2rem"
                            }}
                    />
                    </Box>
                    {isImage && (

                        <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles)=> setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                             <Box
                                {...getRootProps()}
                                border={`2px solid ${palette.secondary.main}`}
                                p="1rem"
                                sx={{ "&:hover": { cursor: "pointer" }, marginTop: "1rem"}}
                                >
                                <input {...getInputProps()} />
                                {!image ? (
                                    <Typography variant="body1">Add image</Typography>
                                ) : (
                                    <Box display="flex" alignItems="center">
                                    <Typography variant="body1">{image.name}</Typography>
                                    <EditOutlined/>
                                    </Box>
                                )}
                                {image && (
                                    <IconButton
                                        onClick={()=>setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                    <DeleteOutlined/>
                                    </IconButton>
                                )}
                            </Box>
                        )}
                    </Dropzone>
                    )}
                    
                    
                </Box>

                <Divider sx={{ margin: "1.25rem 0" }} />

                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap:"0.25rem",
                        }}
                        onClick={() => setIsImage(!isImage)}
                    >
                        <ImageOutlined sx={{ color: mediumMain }}/>
                        <Typography
                            color={mediumMain}
                            sx={{  }}
                        >

                        </Typography>
                    </Box>
                        { isNonMobileScreens ? (
                            <>
                                <Box sx={{
                                    display: "flex",
                                    gap:"0.25rem",
                                    justifyContent: "space-between"
                                }}
                                >
                                    <GifBoxOutlined sx={{ color: mediumMain }}/>
                                    <Typography color={mediumMain}>Clip</Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    gap:"0.25rem",
                                    justifyContent: "space-between"
                                }}
                                >
                                    <AttachFileOutlined sx={{ color: mediumMain }}/>
                                    <Typography color={mediumMain}>Attachment</Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    gap:"0.25rem",
                                    justifyContent: "space-between"
                                }}
                                >
                                    <MicOutlined sx={{ color: mediumMain }}/>
                                    <Typography color={mediumMain}>Audio</Typography>
                                </Box>
                                <Button
                                      disabled={!post}
                                      onClick={handlePost}
                                      sx={{
                                        color: palette.background.alt,
                                        backgroundColor: palette.primary.main,
                                        borderRadius: "3rem"
                                      }}
                                    >
                                        POST
                                    </Button>
                            </>
                        ): <Box sx={{
                                    display: "flex",
                                    gap:"0.25rem",
                                    justifyContent: "space-between"
                                }}>
                                    <MoreHorizOutlined sx={{
                                        color: mediumMain
                                    }}/>
                                    <Button
                                      disabled={!post}
                                      onClick={handlePost}
                                      sx={{
                                        color: palette.background.alt,
                                        backgroundColor: palette.primary.main,
                                        borderRadius: "3rem"
                                      }}
                                    >
                                        POST
                                    </Button>
                                </Box>
                        }
                </Box>
            </WidgetWrapper>
        )
    }

export default MyPostWidget;

