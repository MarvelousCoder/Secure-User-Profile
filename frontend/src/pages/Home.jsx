// import { Link } from "react-router-dom";

// export default function Home() {
//     return (
//         <div style={styles.container}>
//             <div style={styles.card}>
//                 <h1 style={styles.title}>Secure User Profile System</h1>
//                 <p style={styles.subtitle}>
//                     Identity Management & Access Control Microservice
//                 </p>

//                 <div style={styles.buttonGroup}>
//                     <Link to="/login" style={styles.link}>
//                         <button style={styles.primaryBtn}>Login</button>
//                     </Link>

//                     <Link to="/register" style={styles.link}>
//                         <button style={styles.secondaryBtn}>Register</button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
//         fontFamily: "Arial, sans-serif",
//     },
//     card: {
//         backgroundColor: "#ffffff",
//         padding: "40px",
//         borderRadius: "12px",
//         width: "100%",
//         maxWidth: "420px",
//         textAlign: "center",
//         boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
//     },
//     title: {
//         fontSize: "26px",
//         fontWeight: "700",
//         color: "#1e3a8a",
//         marginBottom: "10px",
//     },
//     subtitle: {
//         fontSize: "14px",
//         color: "#475569",
//         marginBottom: "30px",
//         lineHeight: "1.6",
//     },
//     buttonGroup: {
//         display: "flex",
//         justifyContent: "center",
//         gap: "12px",
//     },
//     primaryBtn: {
//         padding: "10px 22px",
//         backgroundColor: "#2563eb",
//         color: "#ffffff",
//         border: "none",
//         borderRadius: "6px",
//         fontSize: "14px",
//         fontWeight: "600",
//         cursor: "pointer",
//     },
//     secondaryBtn: {
//         padding: "10px 22px",
//         backgroundColor: "#ffffff",
//         color: "#2563eb",
//         border: "2px solid #2563eb",
//         borderRadius: "6px",
//         fontSize: "14px",
//         fontWeight: "600",
//         cursor: "pointer",
//     },
//     link: {
//         textDecoration: "none",
//     },
// };


import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    useColorModeValue,
    SimpleGrid,
    chakra,
    shouldForwardProp,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion, isValidMotionProp } from "framer-motion";
import { ShieldCheck, UserCheck, Cpu, Fingerprint, ArrowRight } from "lucide-react";

const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

// --- UPDATED LOGO COMPONENT ---
const BrandLogo = ({ size = "3xl", ...props }) => {
    return (
        <Heading
            as="h1"
            fontSize={size}
            fontWeight="800"
            letterSpacing="tighter"
            lineHeight="1"
            display="flex"
            flexDirection={{ base: "column", md: "row" }} // Stack on mobile if name is too long
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            {...props}
        >
            <chakra.span color={useColorModeValue("gray.900", "white")}>
                SECURE
            </chakra.span>
            <chakra.span color="brand.500" fontWeight="300" ml={{ base: 0, md: 2 }}>
                USER
            </chakra.span>
            <Flex alignItems="center">
                <chakra.span color="brand.500" fontWeight="300" ml={2}>
                    PROFILES
                </chakra.span>
                <Box
                    ml={2}
                    w="8px"
                    h="8px"
                    bg="brand.400"
                    borderRadius="full"
                    display={{ base: "none", md: "block" }}
                />
            </Flex>
        </Heading>
    );
};

export default function Home() {
    return (
        <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
            <Container maxW="container.lg" pt={{ base: 16, md: 28 }} pb={20}>
                <Stack spacing={10} align="center" textAlign="center">

                    {/* Brand Identity Reveal */}
                    <MotionBox
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <BrandLogo size={{ base: "4xl", md: "6xl" }} mb={4} />
                    </MotionBox>

                    {/* Verification Badge */}
                    <MotionBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Flex
                            align="center"
                            bg={useColorModeValue("white", "whiteAlpha.100")}
                            borderWidth={1}
                            borderColor={useColorModeValue("brand.100", "brand.900")}
                            p={1}
                            pr={4}
                            borderRadius="full"
                            boxShadow="sm"
                        >
                            <Flex bg="brand.500" p={1.5} borderRadius="full" mr={3}>
                                <Icon as={ShieldCheck} color="white" w={4} h={4} />
                            </Flex>
                            <Text fontSize="xs" fontWeight="bold" color="brand.600" letterSpacing="widest">
                                IDENTITY VERIFICATION ACTIVE
                            </Text>
                        </Flex>
                    </MotionBox>

                    {/* Main Content */}
                    <MotionBox
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Heading
                            fontSize={{ base: "3xl", md: "5xl" }}
                            fontWeight="extrabold"
                            color={useColorModeValue("gray.900", "white")}
                        >
                            The Gold Standard for <br />
                            <chakra.span
                                bgGradient="linear(to-r, brand.400, brand.600)"
                                bgClip="text"
                            >
                                User Privacy & Security.
                            </chakra.span>
                        </Heading>

                        <Text maxW="2xl" mx="auto" color="gray.500" fontSize={{ base: "lg", md: "xl" }} mt={6}>
                            A robust profile system built for the modern web. Manage your identity
                            with encrypted government identifiers and automated PII protection.
                        </Text>
                    </MotionBox>

                    {/* CTA Buttons */}
                    <Stack
                        direction={{ base: "column", sm: "row" }}
                        spacing={6}
                        mt={8}
                        justify="center"
                        align="center"
                    >
                        <Button
                            as={RouterLink}
                            to="/register"
                            size="lg"
                            h="60px" // Slightly taller for a more premium feel
                            px={10}
                            fontSize="md"
                            fontWeight="bold"
                            color="white"
                            bg="brand.500"
                            borderRadius="2xl" // More rounded to match modern SaaS trends
                            rightIcon={<ArrowRight size={20} />}
                            transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
                            _hover={{
                                bg: "brand.600",
                                transform: "translateY(-3px)",
                                boxShadow: "0 12px 24px -10px rgba(0,118,255,0.6)",
                                _after: { opacity: 1 }
                            }}
                            _active={{
                                bg: "brand.700",
                                transform: "translateY(-1px)",
                            }}
                        >
                            Create Profile
                        </Button>

                        <Button
                            as={RouterLink}
                            to="/login"
                            size="lg"
                            variant="outline" // Outline is better than ghost for secondary CTAs as it defines the clickable area
                            h="60px"
                            px={10}
                            fontSize="md"
                            fontWeight="bold"
                            color={useColorModeValue("gray.700", "gray.200")}
                            borderColor={useColorModeValue("gray.200", "gray.700")}
                            borderRadius="2xl"
                            transition="all 0.2s"
                            _hover={{
                                bg: useColorModeValue("gray.50", "whiteAlpha.100"),
                                borderColor: "brand.500",
                                color: "brand.500",
                                transform: "translateY(-2px)"
                            }}
                        >
                            Log In
                        </Button>
                    </Stack>

                    {/* Enhanced Feature Grid */}
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} pt={16} w="full">
                        <FeatureCard
                            icon={Fingerprint}
                            title="Biometric Alignment"
                            text="Advanced identity mapping ensuring your profile is unique and authenticated."
                        />
                        <FeatureCard
                            icon={UserCheck}
                            title="Verified Access"
                            text="Granular permission sets that keep user data visible only to the right stakeholders."
                        />
                        <FeatureCard
                            icon={Cpu}
                            title="Encrypted Processing"
                            text="Every profile update is processed through an encrypted pipeline for maximum safety."
                        />
                    </SimpleGrid>
                </Stack>
            </Container>
        </Box>
    );
}

const FeatureCard = ({ icon, title, text }) => {
    return (
        <MotionBox
            whileHover={{ y: -8 }}
            bg={useColorModeValue("white", "gray.800")}
            p={8}
            borderRadius="2xl"
            borderWidth={1}
            borderColor={useColorModeValue("gray.100", "gray.700")}
            textAlign="left"
            boxShadow="sm"
        >
            <Icon as={icon} w={8} h={8} color="brand.500" mb={4} />
            <Text fontWeight="bold" fontSize="xl" mb={2}>{title}</Text>
            <Text color="gray.500" fontSize="sm" lineHeight="tall">{text}</Text>
        </MotionBox>
    );
};