import { useState } from "react";
import { useTheme } from "@mui/material";
import "./LoginMain.css";
import LoginNav from "./LoginNav";
import Login from "./Login";
import Register from "./Register";

export default function LoginMain() {
    // const { palette } = useTheme();
    const [isLogin, setIsLogin] = useState(true);
    return (
        <main className="login-register-container Page">
            <LoginNav
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                
            />
            {isLogin ? <Login /> : <Register />}

            {/* {palette.mode === "dark" ? (
                <img src={darkLogo} alt="app logo" />
            ) : (
                <img src={lightLogo} alt="app logo" />
            )} */}
        </main>
    );
}
