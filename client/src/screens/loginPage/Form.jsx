import { useState } from "react";
import { 
    useTheme, 
    Box,
    Grid,
    Button, 
    TextField, 
    useMediaQuery,
    Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik"; 
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";


const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
}

const initialValuesLogin = {
    email: "",
    password: ""
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navidgate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";


    const register = async (values, onSubmitProps) => {
        //allows us to send form data with images
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value])
        }
        formData.append("picturePath", values.picture.name)
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData 
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    }

    const login = async (values, onSubmitProps) => {

        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
                credentials: "include"
            },
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: true
                })
            );
            navidgate("/home");
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {
                ({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleSubmit,
                    handleChange,
                    setFieldValue,
                    resetForm,
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                           <Grid container { ...isNonMobile ? { columnSpacing:2, rowSpacing: 2 } : {rowSpacing : 2} } p={2}>
                                {
                                    isRegister && (
                                        <>
                                             <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="First name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.firstName}
                                                    name="firstName"
                                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                                    helperText={touched.firstName && errors.firstName}
                                                />
                                              </Grid>
                                               <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Last name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.lastName}
                                                    name="lastName"
                                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                                    helperText={touched.lastName && errors.lastName}
                                                />
                                              </Grid>
                                            <Grid item md={12}  xs={12}>
                                                <TextField
                                                        fullWidth
                                                        label="Location"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.location}
                                                        name="location"
                                                        error={Boolean(touched.location) && Boolean(errors.location)}
                                                        helperText={touched.location && errors.location}
                                                    />
                                            </Grid>
                                            <Grid item md={12}  xs={12}>
                                                <TextField
                                                        fullWidth
                                                        label="Occupation"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.occupation}
                                                        name="occupation"
                                                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                                        helperText={touched.occupation && errors.occupation}
                                                    />
                                            </Grid>
                                             <Grid item  md={12} xs={12}>
                                                 <Dropzone
                                                    acceptedFiles=".jpg,.jpeg,.png"
                                                    multiple={false}
                                                    onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                                                    >
                                                    {({ getRootProps, getInputProps }) => (
                                                        <Box
                                                        {...getRootProps()}
                                                        border={`2px solid ${palette.secondary.main}`}
                                                        p="1rem"
                                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                                        >
                                                        <input {...getInputProps()} />
                                                        {!values.picture ? (
                                                            <Typography variant="body1">Add Picture Here</Typography>
                                                        ) : (
                                                            <Box display="flex" alignItems="center">
                                                            <Typography variant="body1">{values.picture.name}</Typography>
                                                            <EditOutlinedIcon />
                                                            </Box>
                                                        )}
                                                        </Box>
                                                    )}
                                                </Dropzone>
                                            </Grid>
                                        </>
                                    )
                                }

                                <Grid item xs={12} md={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={Boolean(touched.email) && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        error={Boolean(touched.password) && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <Button
                                     type="submit"
                                     sx={{
                                         width: "100%",
                                         m: "2rem 0",
                                         p: "1rem",
                                         backgroundColor: palette.secondary.main,
                                         color: palette.background.alt,
                                        "&: hover": { color: palette.secondary.main },
                                     }}
                                    >
                                        {isLogin ? "LOGIN" : "REGISTER" }
                                    </Button>
                                    <Typography
                                        onClick={() => {
                                        setPageType(isLogin ? "register" : "login");
                                         resetForm();
                                    }}
                                     sx={{
                                         textDecoration: "underline",
                                         color: palette.secondary.main,
                                         "&:hover": {
                                             cursor: "pointer",
                                             color: palette.secondary.light
                                        }
                                     }}
                                    >
                                        {isLogin ? "Don't have an account ? sign up here.": "Already have an account? login here"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    )
                }
            }
        </Formik>
    )

}


export default Form;
