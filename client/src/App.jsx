import { BrowserRouter,  Routes, Route } from "react-router-dom";
import HomePage from "./screens/homePage";
import LoginPage from "./screens/loginPage";
import ProfilePage from "./screens/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {  ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { Navigate } from "react-router-dom";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state) => state.token));

    return (
        <div className="App">
            <BrowserRouter>
                <ThemeProvider theme={theme}>    
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/home" element={isAuth ? <HomePage/> : <Navigate to="/"/>}/>
                        <Route path="/profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to="/"/>}/>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
