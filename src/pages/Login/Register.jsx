import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import LoginUsingSocialMedia from "./LoginUsingSocialMedia";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import BasicModal from "../../components/BasicModal/BasicModal";

function passwordConfirmation(mainPass, confirmPass, setRegisterError) {
    if (mainPass !== confirmPass) {
        setRegisterError("Passwords do not match");
        return false;
    }
    setRegisterError("");
    return true;
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const emailInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const idRef = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");
    const { register } = useAuth();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading((prev) => !prev);
        let result;
        if (
            passwordConfirmation(
                passwordInput.current.value,
                confirmPasswordInput.current.value,
                setRegisterError
            )
        ) {
            const userInfo = {
                userId: idRef.current.value,
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailInput.current.value,
                password: passwordInput.current.value,
            };
            result = await register(userInfo);
            if (typeof result === "string") {
                setRegisterError(result);
            } else {
                console.log("register success");
                navigate("/dashboard");
            }
        }
        setLoading((prev) => !prev);
    };

    return (
        <div className="login-form-container">
            <Typography variant="h3">Create Account</Typography>
            <form id="login-form" onSubmit={handleRegisterSubmit}>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">
                        Email
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-email"
                        label="Email"
                        inputRef={emailInput}
                        type="email"
                        size="large"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                        Password
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        label="Password"
                        size="large"
                        inputRef={passwordInput}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirm-password">
                        Confirm Password
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-confirm-password"
                        label="Confirm Password"
                        size="large"
                        inputRef={confirmPasswordInput}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-first-name">
                        First Name
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-first-name"
                        label="First Name"
                        inputRef={firstNameRef}
                        type="text"
                        size="large"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-last-name">
                        Last Name
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-last-name"
                        label="Last Name"
                        inputRef={lastNameRef}
                        type="text"
                        size="large"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-id">ID</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-id"
                        label="ID"
                        inputRef={idRef}
                        type="text"
                        size="large"
                    />
                </FormControl>
                <Button variant="contained" type="submit" disabled={loading}>
                    Register
                </Button>
                <LoginUsingSocialMedia />
            </form>
            {registerError && (
                <BasicModal msg={registerError} setMsg={setRegisterError} />
            )}
        </div>
    );
}
