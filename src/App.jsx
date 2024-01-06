import "./App.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { deepOrange, green, lightGreen } from "@mui/material/colors";

import { useState } from "react";
import { ThemeSwitch } from "./components/ThemeSwitch/ThemeSwitch";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import LoginMain from "./pages/Login/LoginMain";
import Register from "./pages/Login/Register";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import UsersController from "./pages/UsersController/UsersController";

function App() {
    const [modeColor, setModeColor] = useState("dark");
    const theme = createTheme({
        palette: {
            mode: modeColor,
            primary: modeColor === "dark" ? lightGreen : green,
        },
    });
    const handleChange = () => {
        setModeColor((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeSwitch theme={theme} onChange={handleChange} />
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<LoginMain />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/users-controller"
                        element={<UsersController />}
                    />
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
