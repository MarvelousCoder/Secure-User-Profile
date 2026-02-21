// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../api/auth.api";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");

//         const { email, password } = formData;

//         if (!email || !password) {
//             setError("Email and password are required");
//             return;
//         }

//         try {
//             setLoading(true);
//             const data = await loginUser({ email, password });

//             // Store token via context
//             login(data.token);

//             navigate("/profile");
//         } catch (err) {
//             setError(
//                 err?.response?.data?.message || "Login failed"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <form onSubmit={handleSubmit} style={styles.form}>
//                 <h2 style={styles.heading}>Login</h2>

//                 {error && <p style={styles.error}>{error}</p>}

//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     style={styles.input}
//                 />

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     style={styles.input}
//                 />

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     style={styles.button}
//                 >
//                     {loading ? "Logging in..." : "Login"}
//                 </button>

//                 <p style={styles.registerText}>
//                     Don’t have an account?{" "}
//                     <span
//                         style={styles.registerLink}
//                         onClick={() => navigate("/register")}
//                     >
//                         Register
//                     </span>
//                 </p>
//             </form>
//         </div>
//     );
// };

// export default Login;

// /* ---------- Styles ---------- */
// const styles = {
//     container: {
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#f4f6f8",
//     },
//     form: {
//         width: "100%",
//         maxWidth: "400px",
//         padding: "30px",
//         background: "#fff",
//         borderRadius: "8px",
//         boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//         display: "flex",
//         flexDirection: "column",
//     },
//     heading: {
//         textAlign: "center",
//         marginBottom: "20px",
//     },
//     input: {
//         padding: "10px",
//         marginBottom: "12px",
//         borderRadius: "4px",
//         border: "1px solid #ccc",
//         fontSize: "14px",
//     },
//     button: {
//         padding: "10px",
//         background: "#2563eb",
//         color: "#fff",
//         border: "none",
//         borderRadius: "4px",
//         cursor: "pointer",
//         fontSize: "15px",
//     },
//     error: {
//         color: "red",
//         marginBottom: "10px",
//         fontSize: "14px",
//         textAlign: "center",
//     },
//     registerText: {
//         marginTop: "15px",
//         fontSize: "14px",
//         textAlign: "center",
//     },
//     registerLink: {
//         color: "#2563eb",
//         cursor: "pointer",
//         fontWeight: "bold",
//     },
// };



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Alert,
    AlertIcon,
    useToast,
    Link,
    Flex,
    Icon,
    HStack,
    chakra,
    shouldForwardProp
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { Mail, Lock, ShieldCheck, Eye, EyeOff, AlertTriangle } from "lucide-react";

// Enabling Framer Motion for Chakra components
const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const toast = useToast();

    const [showPassword, setShowPassword] = useState(false);
    const [isCapsLock, setIsCapsLock] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleToggle = () => setShowPassword(!showPassword);

    const checkCapsLock = (e) => {
        setIsCapsLock(e.getModifierState("CapsLock"));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);
            const data = await loginUser(formData);
            login(data.token);

            toast({
                title: "Access Granted",
                description: "Decryption keys synchronized. Welcome back.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });

            navigate("/profile");
        } catch (err) {
            setError(err?.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg={useColorModeValue("gray.50", "gray.900")}
        >
            <Container maxW="md" py={12} px={6}>
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Stack spacing={8} mx="auto" w="full">
                        <Stack align="center" spacing={2}>
                            <MotionBox whileHover={{ rotate: 10 }} cursor="pointer">
                                <Icon as={ShieldCheck} w={12} h={12} color="brand.500" />
                            </MotionBox>
                            <Heading fontSize="3xl" textAlign="center" letterSpacing="tight">
                                Sign in to Vault
                            </Heading>
                            <Text fontSize="md" color="gray.500">
                                Enter credentials to access your secure data
                            </Text>
                        </Stack>

                        <Box
                            rounded="2xl"
                            bg={useColorModeValue("white", "gray.800")}
                            boxShadow={useColorModeValue("xl", "2xl")}
                            p={8}
                            borderWidth={1}
                            borderColor={useColorModeValue("gray.100", "gray.700")}
                        >
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={4}>
                                    {error && (
                                        <MotionBox
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                        >
                                            <Alert status="error" borderRadius="lg" fontSize="sm">
                                                <AlertIcon />
                                                {error}
                                            </Alert>
                                        </MotionBox>
                                    )}

                                    <FormControl id="email" isRequired>
                                        <FormLabel fontSize="sm" fontWeight="bold">Email Address</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftElement pointerEvents="none">
                                                <Mail size={18} color="#A0AEC0" />
                                            </InputLeftElement>
                                            <Input
                                                type="email"
                                                name="email"
                                                placeholder="name@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                bg={useColorModeValue("gray.50", "gray.700")}
                                                border={0}
                                                _focus={{ ring: 2, ringColor: "brand.500", bg: useColorModeValue("white", "gray.800") }}
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl id="password" isRequired>
                                        <FormLabel fontSize="sm" fontWeight="bold">Password</FormLabel>
                                        <InputGroup size="lg">
                                            <InputLeftElement pointerEvents="none">
                                                <Lock size={18} color="#A0AEC0" />
                                            </InputLeftElement>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                placeholder="••••••••"
                                                onKeyDown={checkCapsLock}
                                                value={formData.password}
                                                onChange={handleChange}
                                                bg={useColorModeValue("gray.50", "gray.700")}
                                                border={0}
                                                _focus={{ ring: 2, ringColor: "brand.500", bg: useColorModeValue("white", "gray.800") }}
                                            />
                                            <InputRightElement width="3rem">
                                                <Button h="1.75rem" size="sm" onClick={handleToggle} variant="ghost" color="gray.500">
                                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>

                                        {isCapsLock && (
                                            <HStack spacing={1} mt={1} color="orange.400">
                                                <AlertTriangle size={14} />
                                                <Text fontSize="xs" fontWeight="bold">Caps Lock is ON</Text>
                                            </HStack>
                                        )}
                                    </FormControl>

                                    <Flex justify="flex-end">
                                        <Link color="brand.500" fontSize="sm" fontWeight="semibold">
                                            Forgot password?
                                        </Link>
                                    </Flex>

                                    <Button
                                        type="submit"
                                        colorScheme="brand"
                                        color="white"
                                        size="lg"
                                        fontSize="md"
                                        fontWeight="bold"
                                        isLoading={loading}
                                        loadingText="Verifying..."
                                        boxShadow="0 4px 14px 0 rgba(0,118,255,0.39)"
                                        _hover={{
                                            transform: "translateY(-1px)",
                                            boxShadow: "0 6px 20px rgba(0,118,255,0.23)",
                                        }}
                                        _active={{ transform: "translateY(0)" }}
                                    >
                                        Sign In
                                    </Button>

                                    <Text align="center" fontSize="sm" color="gray.500" pt={2}>
                                        New to the Vault?{" "}
                                        <Link
                                            color="brand.500"
                                            fontWeight="bold"
                                            onClick={() => navigate("/register")}
                                        >
                                            Create an account
                                        </Link>
                                    </Text>
                                </Stack>
                            </form>
                        </Box>
                    </Stack>
                </MotionBox>
            </Container>
        </Flex>
    );
};

export default Login;