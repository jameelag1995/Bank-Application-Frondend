import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import BasicCard from "../../components/BasicCard/BasicCard";
import "./DashBoard.css";
import {
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    Slide,
    Typography,
} from "@mui/material";
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
        const url = `https://easy-blue-cockroach-coat.cyclic.app/api/v1/bank/${type}/${currentUser._id}`;
        switch (type) {
            case "deposit":
                await axios
                    .put(url, {
                        amount: parseInt(amountRef.current.value),
                    })
                    .then((res) => {
                        setCurrentUser(res.data);
                        setInvalidInput("Deposit Was Successful");
                    })
                    .catch((error) =>
                        setInvalidInput(error.response.data.message)
                    );
                break;
            case "update-credit":
                await axios
                    .put(url, {
                        amount: parseInt(amountRef.current.value),
                    })
                    .then((res) => {
                        setCurrentUser(res.data);
                        setInvalidInput("Updating Credit Was Successful");
                    })
                    .catch((error) =>
                        setInvalidInput(error.response.data.message)
                    );
                break;
            case "withdraw":
                await axios
                    .put(url, {
                        amount: parseInt(amountRef.current.value),
                    })
                    .then((res) => {
                        setCurrentUser(res.data);
                        setInvalidInput("Withdraw Was Successful");
                    })
                    .catch((error) =>
                        setInvalidInput(error.response.data.message)
                    );
                break;
            case "transfer":
                await axios
                    .put(
                        `https://easy-blue-cockroach-coat.cyclic.app/api/v1/bank/${type}/`,
                        {
                            senderId: currentUser._id,
                            receiverId: receiverIdRef.current.value,
                            amount: parseInt(amountRef.current.value),
                        }
                    )
                    .then((res) => {
                        setCurrentUser(res.data.sender);
                        setInvalidInput("Transfer Was Successful");
                    })
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
        <Slide in direction="up">
            <div className="Dashboard Page">
                <Typography variant="h5">
                    Hello {`${currentUser?.firstName} ${currentUser?.lastName}`}
                </Typography>
                <Button
                    sx={{ position: "absolute", left: "8px", top: "8px" }}
                    variant="contained"
                    color="error"
                    onClick={logout}
                >
                    Logout
                </Button>
                {currentUser?.isAdmin && (
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
                <FormControl sx={{ m: 1, width: "600px" }} variant="outlined">
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
                <div className="action-buttons">
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
                </div>
                <FormControl sx={{ m: 1, width: "600px" }} variant="outlined">
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
                {invalidInput && (
                    <BasicModal msg={invalidInput} setMsg={setInvalidInput} />
                )}
            </div>
        </Slide>
    );
}
