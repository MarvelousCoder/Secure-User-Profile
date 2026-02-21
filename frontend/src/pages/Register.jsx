// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../api/auth.api";

// const Register = () => {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         governmentId: "",
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

//         const { name, email, password, governmentId } = formData;

//         // Basic client-side validation
//         if (!name || !email || !password || !governmentId) {
//             setError("All fields are required");
//             return;
//         }

//         if (password.length < 6) {
//             setError("Password must be at least 6 characters");
//             return;
//         }

//         try {
//             setLoading(true);

//             await registerUser({
//                 name,
//                 email,
//                 password,
//                 governmentId,
//             });

//             // Registration successful → redirect to login
//             navigate("/login");

//         } catch (err) {
//             setError(
//                 err?.response?.data?.message || "Registration failed"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <form onSubmit={handleSubmit} style={styles.form}>
//                 <h2 style={styles.heading}>Register</h2>

//                 {error && <p style={styles.error}>{error}</p>}

//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Full Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     style={styles.input}
//                 />

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

//                 <input
//                     type="text"
//                     name="governmentId"
//                     placeholder="Government ID"
//                     value={formData.governmentId}
//                     onChange={handleChange}
//                     style={styles.input}
//                 />

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     style={styles.button}
//                 >
//                     {loading ? "Registering..." : "Register"}
//                 </button>

//                 <p style={styles.loginText}>
//                     Already have an account?{" "}
//                     <span
//                         style={styles.loginLink}
//                         onClick={() => navigate("/login")}
//                     >
//                         Login
//                     </span>
//                 </p>
//             </form>
//         </div>
//     );
// };

// export default Register;

// /* ---------- Basic Inline Styles ---------- */
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
//     loginText: {
//         marginTop: "15px",
//         fontSize: "14px",
//         textAlign: "center",
//     },
//     loginLink: {
//         color: "#2563eb",
//         cursor: "pointer",
//         fontWeight: "bold",
//     },
// };




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.api";
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
    Progress,
    SimpleGrid,
    Tooltip,
    chakra,
    shouldForwardProp,
    HStack
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { User, Mail, Lock, Fingerprint, ShieldPlus, Eye, EyeOff, Info, CheckCircle2, Circle } from "lucide-react";

const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const Register = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        governmentId: "",
    });

    const handleToggle = () => setShowPassword(!showPassword);

    const calculateStrength = (pass) => {
        if (!pass) return 0;
        let score = 0;
        if (pass.length >= 6) score += 40;
        if (/[A-Z]/.test(pass)) score += 30;
        if (/[0-9]/.test(pass)) score += 30;
        return score;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters for security");
            return;
        }

        try {
            setLoading(true);
            await registerUser(formData);
            toast({
                title: "Identity Verified",
                description: "Your digital vault is ready. Please log in.",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "top",
            });
            navigate("/login");
        } catch (err) {
            setError(err?.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const passwordRequirements = [
        { label: "Min 6 characters", met: formData.password.length >= 6 },
        { label: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
        { label: "One number", met: /[0-9]/.test(formData.password) },
    ];

    return (
        <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue("gray.50", "gray.900")} py={1}>
            <Container maxW="lg">
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Stack spacing={8} mx="auto" w="full">
                        <Stack align="center" spacing={2}>
                            <Icon as={ShieldPlus} w={12} h={12} color="brand.500" />
                            <Heading fontSize="3xl" textAlign="center">Create Secure Profile</Heading>
                            <Text fontSize="md" color="gray.500">Your data is encrypted using AES-256</Text>
                        </Stack>

                        <Box rounded="2xl" bg={useColorModeValue("white", "gray.800")} boxShadow="xl" p={8} borderWidth={1} borderColor={useColorModeValue("gray.100", "gray.700")}>
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    {error && (
                                        <Alert status="error" borderRadius="lg" fontSize="sm">
                                            <AlertIcon /> {error}
                                        </Alert>
                                    )}

                                    <FormControl id="name" isRequired>
                                        <FormLabel fontSize="sm" fontWeight="bold">Full Name</FormLabel>
                                        <InputGroup size="md">
                                            <InputLeftElement children={<User size={18} color="#A0AEC0" />} />
                                            <Input name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} bg={useColorModeValue("gray.50", "gray.700")} border={0} _focus={{ ring: 2, ringColor: "brand.500" }} />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl id="email" isRequired>
                                        <FormLabel fontSize="sm" fontWeight="bold">Email</FormLabel>
                                        <InputGroup size="md">
                                            <InputLeftElement children={<Mail size={18} color="#A0AEC0" />} />
                                            <Input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} bg={useColorModeValue("gray.50", "gray.700")} border={0} _focus={{ ring: 2, ringColor: "brand.500" }} />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl id="governmentId" isRequired>
                                        <HStack justify="space-between" mb={1}>
                                            <FormLabel fontSize="sm" fontWeight="bold" mb={0}>Government ID</FormLabel>
                                            <Tooltip label="Your ID is hashed and encrypted locally before transit." fontSize="xs" placement="top">
                                                <span><Icon as={Info} size={14} color="gray.400" cursor="help" /></span>
                                            </Tooltip>
                                        </HStack>
                                        <InputGroup size="md">
                                            <InputLeftElement children={<Fingerprint size={18} color="#A0AEC0" />} />
                                            <Input name="governmentId" placeholder="Enter ID Number" value={formData.governmentId} onChange={handleChange} bg={useColorModeValue("gray.50", "gray.700")} border={0} _focus={{ ring: 2, ringColor: "brand.500" }} />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl id="password" isRequired>
                                        <FormLabel fontSize="sm" fontWeight="bold">Password</FormLabel>
                                        <InputGroup size="md">
                                            <InputLeftElement children={<Lock size={18} color="#A0AEC0" />} />
                                            <Input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} bg={useColorModeValue("gray.50", "gray.700")} border={0} _focus={{ ring: 2, ringColor: "brand.500" }} />
                                            <InputRightElement width="3rem">
                                                <Button h="1.5rem" size="sm" onClick={handleToggle} variant="ghost" color="gray.500">
                                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>

                                        {/* Strength Bar & Requirements */}
                                        <Stack mt={3} spacing={2}>
                                            <Progress value={calculateStrength(formData.password)} size="xs" colorScheme={calculateStrength(formData.password) < 100 ? "yellow" : "green"} borderRadius="full" />
                                            <SimpleGrid columns={1} spacing={1}>
                                                {passwordRequirements.map((req, i) => (
                                                    <HStack key={i} spacing={1}>
                                                        <Icon as={req.met ? CheckCircle2 : Circle} size={12} color={req.met ? "green.500" : "gray.400"} />
                                                        <Text fontSize="xs" color={req.met ? "gray.700" : "gray.500"} _dark={{ color: req.met ? "gray.200" : "gray.500" }}>{req.label}</Text>
                                                    </HStack>
                                                ))}
                                            </SimpleGrid>
                                        </Stack>
                                    </FormControl>

                                    <Button type="submit" colorScheme="brand" color="white" size="lg" fontSize="md" fontWeight="bold" isLoading={loading} loadingText="Creating Vault..." boxShadow="0 4px 14px 0 rgba(0,118,255,0.39)" mt={1} _hover={{
                                        transform: "translateY(-1px)",
                                        boxShadow: "0 6px 20px rgba(0,118,255,0.23)",
                                    }}
                                        _active={{ transform: "translateY(0)" }}>
                                        Register Identity
                                    </Button>

                                    <Text align="center" fontSize="sm" color="gray.500" pt={1}>
                                        Already have a vault?{" "}
                                        <Link color="brand.500" fontWeight="bold" onClick={() => navigate("/login")}>Log In</Link>
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

export default Register;