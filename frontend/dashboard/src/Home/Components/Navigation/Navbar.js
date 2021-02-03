import React from "react";
import { Container } from "@chakra-ui/react";

const Navbar = (props) => {
  return <Container bg='gray.200' maxW="100%">{props.children}</Container>;
};

export default Navbar;
