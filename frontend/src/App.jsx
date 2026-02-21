// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Profile from "./pages/Profile";
// import Register from "./pages/Register";
// import Home from "./pages/Home";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home/>}/>
//       <Route path="/register" element={<Register/>}/>
//       <Route path="/login" element={<Login />} />
//       <Route path="/profile" element = {<ProtectedRoute><Profile/></ProtectedRoute>}/>
//     </Routes>
//   );
// }

// export default App;



import { Routes, Route, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  Container,
  chakra,
  Spacer
} from "@chakra-ui/react";
import { ShieldCheck, LogOut, User as UserIcon, Home as HomeIcon } from "lucide-react";
import { useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Dynamic colors for light/dark mode
  const navBg = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(26, 32, 44, 0.8)");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      bg={navBg}
      px={4}
      borderBottomWidth={1}
      borderColor={borderColor}
      position="fixed"
      w="full"
      zIndex="sticky"
      backdropFilter="blur(10px)"
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center">
          {/* LOGO SECTION */}
          <HStack spacing={2} as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <Icon as={ShieldCheck} w={8} h={8} color="brand.500" />
            <Text fontWeight="800" fontSize="xl" letterSpacing="tighter">
              VAULT<chakra.span color="brand.500">.ID</chakra.span>
            </Text>
          </HStack>

          <Spacer />

          {/* NAVIGATION LINKS */}
          <HStack spacing={4} display={{ base: "none", md: "flex" }} mr={8}>
            <Button
              as={RouterLink}
              to="/"
              variant="ghost"
              leftIcon={<HomeIcon size={18} />}
              fontSize="sm"
              fontWeight="bold"
            >
              Home
            </Button>
            {isAuthenticated && (
              <Button
                as={RouterLink}
                to="/profile"
                variant="ghost"
                leftIcon={<UserIcon size={18} />}
                fontSize="sm"
                fontWeight="bold"
              >
                Profile Dashboard
              </Button>
            )}
          </HStack>

          {/* ACTION BUTTONS */}
          <Flex alignItems="center">
            {isAuthenticated ? (
              <Button
                colorScheme="red"
                variant="solid"
                size="sm"
                borderRadius="full"
                leftIcon={<LogOut size={16} />}
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            ) : (
              <HStack spacing={3}>
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="ghost"
                  size="sm"
                  fontWeight="bold"
                >
                  Sign In
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  colorScheme="brand"
                  size="sm"
                  borderRadius="full"
                  px={6}
                >
                  Get Started
                </Button>
              </HStack>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

function App() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <Navbar />
      <Box pt={20}> {/* Increased padding slightly for better breathing room */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={
            <Flex align="center" justify="center" h="70vh" direction="column" gap={4}>
              <Text fontSize="4xl" fontWeight="bold" color="gray.300">404</Text>
              <Text fontSize="xl" color="gray.500">Resource not found in the Vault.</Text>
              <Button as={RouterLink} to="/" colorScheme="brand" variant="outline">Back to Safety</Button>
            </Flex>
          } />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;