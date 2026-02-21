// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const storedToken = localStorage.getItem("token");
//         if (storedToken) {
//             setToken(storedToken);
//             setIsAuthenticated(true);
//         }
//     }, []);

//     const login = (jwtToken) => {
//         localStorage.setItem("token", jwtToken);
//         setToken(jwtToken);
//         setIsAuthenticated(true);
//     };

//     const logout = () => {
//         localStorage.removeItem("token");
//         setToken(null);
//         setIsAuthenticated(false);
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 token,
//                 isAuthenticated,
//                 login,
//                 logout,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // 👈 Added loading state

    useEffect(() => {
        const checkAuth = () => {
            try {
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                localStorage.removeItem("token");
            } finally {
                // Set loading to false only after the token check is done
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (jwtToken) => {
        localStorage.setItem("token", jwtToken);
        setToken(jwtToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                loading, // 👈 Exporting loading to use in ProtectedRoute
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};