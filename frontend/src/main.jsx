// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";
// import { AuthProvider } from "./context/AuthContext.jsx";
// import { ChakraProvider, extendTheme } from "@chakra-ui/react";


// const theme = extendTheme({
//   config: { initialColorMode: "dark", useSystemColorMode: false },
//   colors: {
//     brand: {
//       50: "#e0f2fe", 100: "#bae6fd", 500: "#3b82f6", 900: "#1e3a8a",
//     },
//   },
// });

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <ChakraProvider theme={theme}>
//       <BrowserRouter>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </BrowserRouter>
//     </ChakraProvider>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// 🎨 Customizing the theme for a "Secure" look
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false
  },
  colors: {
    brand: {
      50: "#e0f2fe",
      100: "#bae6fd",
      500: "#3b82f6", // Vibrant Blue
      600: "#2563eb",
      900: "#1e3a8a", // Navy Blue
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
      },
    }),
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);