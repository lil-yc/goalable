import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from "react-router-dom";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#0c2a59", "#111C36")(props),
      color: mode("gray.800", "#FFFFFF")(props),
      fontFamily: "Lexend, Times New Roman",
    },
  }),
};

// Colors - Bg blue: #111C36 Bright orange: #ff9f1a, transition yellow: #decc81, last blue: #7f99d7

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};


const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);