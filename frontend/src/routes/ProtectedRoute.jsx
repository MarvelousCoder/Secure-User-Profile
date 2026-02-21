// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//     const { isAuthenticated } = useAuth();

//     if (!isAuthenticated) {
//         return <Navigate to="/login" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;


import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Center, Spinner, VStack, Text } from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // 1. Handle the "Checking Auth" state
    if (loading) {
        return (
            <Center h="100vh">
                <VStack spacing={4}>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="brand.500"
                        size="xl"
                    />
                    <Text fontWeight="medium" color="gray.500">
                        Verifying Session...
                    </Text>
                </VStack>
            </Center>
        );
    }

    // 2. If not authenticated, redirect to login
    // We use 'state' to remember where they were trying to go
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3. Authorized access
    return children;
};

export default ProtectedRoute;