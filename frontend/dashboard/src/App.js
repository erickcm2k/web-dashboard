import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./Home/Pages/Home";
import { extendTheme } from "@chakra-ui/react";
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
};

export default App;
