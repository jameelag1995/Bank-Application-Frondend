import {
    Button,
    FormControl,
    IconButton,
    InputLabel,
    OutlinedInput,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import "./UsersController.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BasicModal from "../../components/BasicModal/BasicModal";
export default function UsersController() {
    const url = `http://localhost:3000/api/v1/bank`;
    const [displayedData, setDisplayedData] = useState([]);
    const [errorAlert, setErrorAlert] = useState("");
    const navigate = useNavigate();
    const minRef = useRef();
    const maxRef = useRef();
    const handleUsersClick = async (type, id = "") => {
        switch (type) {
            case "/":
                await axios
                    .get(url)
                    .then((res) => setDisplayedData(res.data))
                    .catch((error) =>
                        setErrorAlert(error.response.data.message)
                    );
                break;
            case "/users/active":
                await axios
                    .get(url + type)
                    .then((res) => setDisplayedData(res.data))
                    .catch((error) =>
                        setErrorAlert(error.response.data.message)
                    );
                break;
            case "/users/inactive":
                await axios
                    .get(url + type)
                    .then((res) => setDisplayedData(res.data))
                    .catch((error) =>
                        setErrorAlert(error.response.data.message)
                    );
                break;
            case "/delete":
                await axios
                    .delete(url + type + `/${id}`)
                    .then(() => fetchData())
                    .catch((error) =>
                        setErrorAlert(error.response.data.message)
                    );
                break;
            default:
                break;
        }
    };
    const handleActivation = async (id, isActive) => {
        if (isActive) {
            await axios
                .put(url + `/deactivate/${id}`)
                .then(() => fetchData())
                .catch((error) => setErrorAlert(error.response.data.message));
        } else {
            await axios
                .put(url + `/activate/${id}`)
                .then(() => fetchData())
                .catch((error) => setErrorAlert(error.response.data.message));
        }
    };
    const handleFilterClick = async (type) => {
        let min = parseInt(minRef.current.value);
        let max = parseInt(maxRef.current.value);
        const currParams = { filterType: type, min, max };
        switch (type) {
            case "cash":
                await axios
                    .get(url + "/filter" + `/by`, { params: currParams })
                    .then((res) => setDisplayedData(res.data))
                    .catch((error) =>
                        setErrorAlert(error.response.data.message)
                    );
                break;
            case "credit":
                await axios
                    .get(url + "/filter" + `/by`, { params: currParams })
                    .then((res) => setDisplayedData(res.data))
                    .catch((error) =>
                        setErrorAlert(error.response.data.message)
                    );
                break;
            case "balance":
                await axios
                    .get(url + "/filter" + `/by`, { params: currParams })
                    .then((res) => setDisplayedData(res.data))
                    .catch((error) =>
                        setErrorAlert(error.response.data.message)
                    );
                break;

            default:
                break;
        }
    };
    const fetchData = async () => {
        await axios
            .get(url)
            .then((res) => setDisplayedData(res.data))
            .catch((error) => setErrorAlert(error.response.data.message));
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="UsersController Page">
            <Button variant="contained" onClick={() => navigate("/dashboard")}>
                Back To Dashboard
            </Button>
            <div className="controller">
                <Button
                    variant="contained"
                    sx={{ width: "300px" }}
                    onClick={() => {
                        handleUsersClick("/");
                    }}
                >
                    Show All Users
                </Button>
                <Button
                    variant="contained"
                    sx={{ width: "300px" }}
                    onClick={() => {
                        handleUsersClick("/users/active");
                    }}
                >
                    Show All Active Users
                </Button>
                <Button
                    variant="contained"
                    sx={{ width: "300px" }}
                    onClick={() => {
                        handleUsersClick("/users/inactive");
                    }}
                >
                    Show All Inactive Users
                </Button>
            </div>
            <div className="filter">
                <Typography variant="h4">Filter Users</Typography>
                <div className="filter-actions">
                    <FormControl
                        sx={{ m: 1, width: "200px" }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-minimum">
                            Minimum
                        </InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-minimum"
                            label="Minimum"
                            inputRef={minRef}
                            type="text"
                            size="large"
                        />
                    </FormControl>
                    <FormControl
                        sx={{ m: 1, width: "200px" }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-maximum">
                            Maximum
                        </InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-maximum"
                            label="Maximum"
                            inputRef={maxRef}
                            type="text"
                            size="large"
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        onClick={() => handleFilterClick("cash")}
                    >
                        Filter By Cash
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleFilterClick("credit")}
                    >
                        Filter By Credit
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleFilterClick("balance")}
                    >
                        Filter By Total Balance
                    </Button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>DB ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Cash</TableCell>
                            <TableCell>Credit</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedData.map((user) => (
                            <TableRow key={user.userId}>
                                <TableCell>{user.userId}</TableCell>
                                <TableCell>{user._id}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.createdAt}</TableCell>
                                <TableCell>{user.cash}</TableCell>
                                <TableCell>{user.credit}</TableCell>
                                <TableCell>{user.credit + user.cash}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleActivation(
                                                user._id,
                                                user.isActive
                                            )
                                        }
                                        variant="contained"
                                        color={
                                            user.isActive
                                                ? "success"
                                                : "warning"
                                        }
                                    >
                                        {user.isActive
                                            ? "Active"
                                            : "Not Active"}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                            handleUsersClick(
                                                "/delete",
                                                user._id
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {errorAlert && (
                <BasicModal msg={errorAlert} setMsg={setErrorAlert} />
            )}
        </div>
    );
}
