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

    async function register(userData) {
        let result = await axios
            .post("http://localhost:3000/api/v1/bank", userData)
            .then((res) => res.data)
            .catch((error) => error.response.data.message);
        if (typeof result !== "string") {
            localStorage.setItem("user", JSON.stringify(result));
            setCurrentUser(result);
        }
        return result;
    }
    async function login(email, password) {
        let result = await axios
            .get("http://localhost:3000/api/v1/bank/user/by-email", {
                params: { email: email },
            })
            .then((res) => res.data[0])
            .catch((error) => error.response.data.message);
        console.log(result);
        if (typeof result !== "string") {
            if (result.password === password) {
                if (result.isActive) {
                    console.log("login successful");
                    if (result.isAdmin) {
                        setIsAdmin(true);
                    }
                    localStorage.setItem("user", JSON.stringify(result));
                    setCurrentUser(result);
                } else {
                    result =
                        "Account is inActive Talk to the manager to Activate it";
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
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setCurrentUser(user);
            setIsAdmin(user.isAdmin);
            navigate("/dashboard");
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
