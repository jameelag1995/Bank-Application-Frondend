import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import BasicCard from "../../components/BasicCard/BasicCard";
import "./DashBoard.css";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import axios from "axios";
import BasicModal from "../../components/BasicModal/BasicModal";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const { currentUser, setCurrentUser, isAdmin, logout } = useAuth();
    const [invalidInput, setInvalidInput] = useState("");
    const navigate = useNavigate();
    const amountRef = useRef();

    const receiverIdRef = useRef();
    const handleClick = async (type) => {
        const url = `http://localhost:3000/api/v1/bank/${type}/${currentUser._id}`;
        switch (type) {
            case "deposit":
                await axios
                    .put(url, {
                        amount: parseInt(amountRef.current.value),
                    })
                    .then((res) => setCurrentUser(res.data))
                    .catch((error) =>
                        setInvalidInput(error.response.data.message)
                    );
                break;
            case "update-credit":
                await axios
                    .put(url, {
                        amount: parseInt(amountRef.current.value),
                    })
                    .then((res) => setCurrentUser(res.data))
                    .catch((error) =>
                        setInvalidInput(error.response.data.message)
                    );
                break;
            case "withdraw":
                await axios
                    .put(url, {
                        amount: parseInt(amountRef.current.value),
                    })
                    .then((res) => setCurrentUser(res.data))
                    .catch((error) =>
                        setInvalidInput(error.response.data.message)
                    );
                break;
            case "transfer":
                await axios
                    .put(`http://localhost:3000/api/v1/bank/${type}/`, {
                        senderId: currentUser._id,
                        receiverId: receiverIdRef.current.value,
                        amount: parseInt(amountRef.current.value),
                    })
                    .then((res) => setCurrentUser(res.data.sender))
                    .catch((error) =>
                        setInvalidInput(error.response.data.message)
                    );
                break;
            default:
                setInvalidInput("Action not available");
                break;
        }
    };
    return (
        <div className="Dashboard Page">
            <Button variant="contained" color="error" onClick={logout}>
                Logout
            </Button>
            {isAdmin && (
                <div className="admin-actions">
                    <Button
                        variant="contained"
                        sx={{ width: "300px" }}
                        onClick={() => navigate("/users-controller")}
                    >
                        Users Controller
                    </Button>
                </div>
            )}
            <div className="userInfo">
                <BasicCard title="Cash" amount={currentUser?.cash} />
                <BasicCard title="Credit" amount={currentUser?.credit} />
                <BasicCard
                    title="Total Balance"
                    amount={currentUser?.cash + currentUser?.credit}
                />
            </div>
            <div className="action-buttons">
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">
                        Amount
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-amount"
                        label="Amount"
                        inputRef={amountRef}
                        type="text"
                        size="large"
                    />
                </FormControl>
                <Button
                    sx={{ width: "300px" }}
                    variant="contained"
                    onClick={() => handleClick("deposit")}
                >
                    Deposit Cash
                </Button>
                <Button
                    sx={{ width: "300px" }}
                    variant="contained"
                    onClick={() => handleClick("update-credit")}
                >
                    Update Credit
                </Button>
                <Button
                    sx={{ width: "300px" }}
                    variant="contained"
                    onClick={() => handleClick("withdraw")}
                >
                    Withdraw
                </Button>
                <Button
                    sx={{ width: "300px" }}
                    variant="contained"
                    onClick={() => handleClick("transfer")}
                >
                    Transfer Money
                </Button>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-receiver-id">
                        Receiver ID
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-receiver-id"
                        label="Receiver ID"
                        inputRef={receiverIdRef}
                        type="text"
                        size="large"
                    />
                </FormControl>
            </div>
            {invalidInput && (
                <BasicModal msg={invalidInput} setMsg={setInvalidInput} />
            )}
        </div>
    );
}
