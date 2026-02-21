// import { useEffect, useState } from "react";
// import { getProfile } from "../api/auth.api";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { maskGovernmentId } from "../utils/mask.util";

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();
//     const { logout } = useAuth();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const data = await getProfile();
//                 setUser(data.user);
//             } catch (error) {
//                 logout();
//                 navigate("/login");
//             }
//         };

//         fetchProfile();
//     }, []);

//     const handleLogout = () => {
//         logout();
//         navigate("/login");
//     };

//     if (!user) {
//         return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading profile...</p>;
//     }

//     return (
//         <div style={styles.container}>
//             <div style={styles.card}>
//                 <h2 style={styles.heading}>User Dashboard</h2>

//                 <div style={styles.row}>
//                     <span>Name</span>
//                     <strong>{user.name}</strong>
//                 </div>

//                 <div style={styles.row}>
//                     <span>Email</span>
//                     <strong>{user.email}</strong>
//                 </div>

//                 <div style={styles.row}>
//                     <span>Government ID</span>
//                     <strong>{maskGovernmentId(user.governmentId)}</strong>
//                 </div>

//                 <button onClick={handleLogout} style={styles.logoutBtn}>
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Profile;

// /* ---------- Styles ---------- */
// const styles = {
//     container: {
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#eef2f7",
//     },
//     card: {
//         width: "100%",
//         maxWidth: "450px",
//         background: "#fff",
//         padding: "30px",
//         borderRadius: "10px",
//         boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
//     },
//     heading: {
//         textAlign: "center",
//         marginBottom: "25px",
//     },
//     row: {
//         display: "flex",
//         justifyContent: "space-between",
//         padding: "10px 0",
//         borderBottom: "1px solid #eee",
//         fontSize: "15px",
//     },
//     logoutBtn: {
//         marginTop: "25px",
//         width: "100%",
//         padding: "10px",
//         background: "#dc2626",
//         color: "#fff",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//         fontSize: "15px",
//     },
// };


import { useEffect, useState } from "react";
import { getProfile } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { maskGovernmentId } from "../utils/mask.util";
import {
    Box,
    Container,
    VStack,
    HStack,
    Heading,
    Text,
    Button,
    Icon,
    Divider,
    useColorModeValue,
    IconButton,
    Badge,
    Skeleton,
    SkeletonCircle,
    Flex,
    Tooltip
} from "@chakra-ui/react";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogOut,
    ShieldCheck,
    ShieldAlert,
    Calendar
} from "lucide-react";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [showFullId, setShowFullId] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.100", "gray.700");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setUser(data.user);
            } catch (error) {
                logout();
                navigate("/login");
            }
        };
        fetchProfile();
    }, [logout, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Loading State UI
    if (!user) {
        return (
            <Container maxW="md" pt={20}>
                <Box p={8} bg={bgColor} borderRadius="2xl" boxShadow="xl">
                    <VStack spacing={6} align="stretch">
                        <HStack spacing={4}>
                            <SkeletonCircle size="12" />
                            <VStack align="start" spacing={2}>
                                <Skeleton h="20px" w="150px" />
                                <Skeleton h="12px" w="100px" />
                            </VStack>
                        </HStack>
                        <Skeleton h="100px" borderRadius="xl" />
                        <Skeleton h="40px" />
                    </VStack>
                </Box>
            </Container>
        );
    }

    return (
        <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue("gray.50", "gray.900")} py={12}>
            <Container maxW="md">
                <VStack spacing={6}>
                    {/* Main Dashboard Card */}
                    <Box
                        w="full"
                        bg={bgColor}
                        p={8}
                        borderRadius="3xl"
                        boxShadow="2xl"
                        borderWidth={1}
                        borderColor={borderColor}
                        position="relative"
                        overflow="hidden"
                    >
                        {/* Top Security Banner */}
                        <Box position="absolute" top={0} left={0} w="full" h="4px" bg="green.400" />

                        <VStack spacing={6} align="stretch">
                            <HStack justify="space-between">
                                <VStack align="start" spacing={0}>
                                    <Heading size="lg">User Vault</Heading>
                                    <HStack>
                                        <Icon as={ShieldCheck} color="green.400" size={14} />
                                        <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                            Session Encrypted
                                        </Text>
                                    </HStack>
                                </VStack>
                                <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full">
                                    Active
                                </Badge>
                            </HStack>

                            <Divider />

                            {/* User Details */}
                            <VStack align="stretch" spacing={5}>
                                <InfoField icon={User} label="Display Name" value={user.name} />
                                <InfoField icon={Mail} label="Registered Email" value={user.email} />

                                {/* Sensitive Data Box */}
                                <Box
                                    p={4}
                                    bg={useColorModeValue("blue.50", "whiteAlpha.50")}
                                    borderRadius="2xl"
                                    borderWidth={1}
                                    borderColor={useColorModeValue("blue.100", "whiteAlpha.200")}
                                >
                                    <HStack justify="space-between" mb={2}>
                                        <HStack spacing={2}>
                                            <Icon as={Lock} color="brand.500" size={16} />
                                            <Text fontSize="xs" fontWeight="bold" color="gray.500">GOVERNMENT ID</Text>
                                        </HStack>
                                        <Tooltip label={showFullId ? "Hide Sensitive Data" : "Reveal ID"} hasArrow>
                                            <IconButton
                                                aria-label="Toggle ID Visibility"
                                                icon={showFullId ? <EyeOff size={18} /> : <Eye size={18} />}
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowFullId(!showFullId)}
                                                colorScheme="brand"
                                            />
                                        </Tooltip>
                                    </HStack>
                                    <Text fontSize="xl" fontFamily="mono" letterSpacing="2px" fontWeight="bold">
                                        {showFullId ? user.governmentId : maskGovernmentId(user.governmentId)}
                                    </Text>
                                </Box>
                            </VStack>

                            <Button
                                leftIcon={<LogOut size={18} />}
                                colorScheme="red"
                                variant="ghost"
                                w="full"
                                onClick={handleLogout}
                                _hover={{ bg: "red.50", color: "red.600" }}
                                _dark={{ _hover: { bg: "red.900", color: "red.200" } }}
                            >
                                Terminate Session
                            </Button>
                        </VStack>
                    </Box>

                    {/* Footer Info */}
                    <HStack color="gray.500" fontSize="xs">
                        <Icon as={ShieldAlert} size={12} />
                        <Text>Your ID data is decrypted locally for this view only.</Text>
                    </HStack>
                </VStack>
            </Container>
        </Flex>
    );
};

// Helper Component for Info Rows
const InfoField = ({ icon, label, value }) => (
    <HStack spacing={4} align="center">
        <Flex
            bg={useColorModeValue("gray.100", "gray.700")}
            p={2}
            borderRadius="lg"
            color="brand.500"
        >
            <Icon as={icon} size={20} />
        </Flex>
        <VStack align="start" spacing={0}>
            <Text fontSize="xs" color="gray.500" fontWeight="medium">{label}</Text>
            <Text fontWeight="bold" fontSize="md">{value}</Text>
        </VStack>
    </HStack>
);

export default Profile;