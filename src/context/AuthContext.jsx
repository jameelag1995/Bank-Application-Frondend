import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext({
    currentUser: {},
    setCurrentUser: () => {},
    isAdmin: Boolean,
    login: () => {},
    logout: () => {},
    register: () => {},
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    // "http://localhost:3000/api/v1/bank";
    async function register(userData) {
        try {
            let result = await axios.post(
                "https://easy-blue-cockroach-coat.cyclic.app/api/v1/bank",
                userData
            );
            if (typeof result.data !== "string") {
                localStorage.setItem("user", JSON.stringify(result.data));
                setCurrentUser(result.data);
            }
            return result.data;
        } catch (error) {
            console.log(error.response.data.message);
            return error.response.data.message;
        }
    }
    async function login(email, password) {
        let result = await axios
            .get(
                "https://easy-blue-cockroach-coat.cyclic.app/api/v1/bank/user/by-email",
                {
                    params: { email: email },
                }
            )
            .then((res) => res.data[0])
            .catch((error) => error.response.data.message);
        if (typeof result !== "string") {
            if (result.password === password) {
                if (result.isActive) {
                    if (result.isAdmin) {
                        setIsAdmin(true);
                    }
                    localStorage.setItem("user", JSON.stringify(result));
                    setCurrentUser(result);
                } else {
                    result =
                        "Account is Not Active Talk to the Manager to Activate it";
                }
            } else {
                result = "Wrong Password!";
            }
        }
        return result;
    }
    function logout() {
        localStorage.clear();
        setCurrentUser(null);
        setIsAdmin(false);
        navigate("/");
    }
    useEffect(() => {
        let user;

        if (localStorage.getItem("user") !== "undefined") {
            user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                login(user.email, user.password);
            }
        }
    }, []);
    const AuthContextValues = {
        currentUser,
        setCurrentUser,
        login,
        logout,
        register,
        isAdmin,
    };
    return (
        <AuthContext.Provider value={AuthContextValues}>
            {children}
        </AuthContext.Provider>
    );
}
