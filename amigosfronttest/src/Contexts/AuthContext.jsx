import { createContext, useEffect, useState } from "react";
import fetcher from "../Helpers/fetcher";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [token, setToken] = useState("");
    const [userRole, setUserRole] = useState("");
    const [isLoading, setIsLoading] = useState(true); // New loading state

    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const authResponse = await fetcher.get("/api/v1/auth/auth");
                if (authResponse.valid) {
                    setIsLoggedIn(true);
                    setUserEmail(authResponse.email);
                    setUserRole(authResponse.role);
                } else {
                    setIsLoggedIn(false);
                    setUserEmail("");
                    setUserRole("");
                }
            } catch (error) {
                setIsLoggedIn(false);
                setUserEmail("");
                setUserRole("");
            } finally {
                setIsLoading(false); // Update loading state once the request completes
            }
        };

        fetchAuth(); 
    }, []);

    const login = (token, email, role) => {
        setIsLoggedIn(true);
        setToken(token);
        setUserEmail(email);
        setUserRole(role);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setToken("");
        setUserEmail("");
        setUserRole("");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userEmail, token, userRole, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
