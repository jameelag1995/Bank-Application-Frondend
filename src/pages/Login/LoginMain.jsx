import { useState } from "react";
import { useTheme } from "@mui/material";
import "./LoginMain.css";
import LoginNav from "./LoginNav";
import Login from "./Login";
import Register from "./Register";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function LoginMain() {
    // const { palette } = useTheme();
    const [isLogin, setIsLogin] = useState(true);
    return (
        <main className="login-register-container Page">
            <LoginNav isLogin={isLogin} setIsLogin={setIsLogin} />
            {isLogin ? <Login /> : <Register />}

            <AccountBalanceIcon
                color="success"
                sx={{ width: "200px", height: "200px" }}
            />
            {/* {palette.mode === "dark" ? (
                <img src={darkLogo} alt="app logo" />
            ) : (
                <img src={lightLogo} alt="app logo" />
            )} */}
        </main>
    );
}
