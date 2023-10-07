import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { HashRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

//extend the theme
const colors = {
  brand: {
    100: "#F2DAE1",
    200: "#FAB8CC",
    300: "#F8769D",
    400: "#EC507F",
    500: "#DD3064",
    600: "#B90E41",
    700: "#9A0A35",
    800: "#6A0624",
    900: "#420316",
  },
  neutral: {
    100: "#F0EAEC",
    200: "#E4D9DC",
    300: "#D9CACF",
    400: "#B69BA3",
    500: "#886670",
    600: "#734C58",
    700: "#532C38",
    800: "#40212B",
    900: "#18030A",
  },
  success: {
    100: "#D8FAC5",
    200: "#CDFCB3",
    300: "#BAFA98",
    400: "#97FA61",
    500: "#6AE02B",
    600: "#53C217",
    700: "#328704",
    800: "#1F5701",
    900: "#102B01",
  },
  warning: {
    100: "#FAF1C5",
    200: "#FCF0B3",
    300: "#FAEA98",
    400: "#FAE061",
    500: "#E0C434",
    600: "#C2A517",
    700: "#877104",
    800: "#574801",
    900: "#2B2401",
  },
  error: {
    100: "#FAD8D7",
    200: "#FCC7C5",
    300: "#FA9C98",
    400: "#FA6761",
    500: "#D93732",
    600: "#C21D17",
    700: "#870804",
    800: "#570401",
    900: "#2B0301",
  },
  supportingBlue: {
    100: "#D7EEFA",
    200: "#C5E9FC",
    300: "#98D8FA",
    400: "#61C5FA",
    500: "#249BDB",
    600: "#1786C2",
    700: "#045987",
    800: "#013957",
    900: "#011D2B",
  },
};

const fonts = {
  heading: "Playfair Display SC, serif",
  body: "Lato, sans-serif",
};

const breakpoints = {
  base: "0px",
  xxs: "320px",
  xs: "375px",
  sm: "425px",
  smMd: "575px",
  md: "768px",
  mdLg: "1024px",
  lg: "1200px",
  xl: "1400px",
};

const theme = extendTheme({ colors, fonts, breakpoints });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ChakraProvider>
  </React.StrictMode>
);
