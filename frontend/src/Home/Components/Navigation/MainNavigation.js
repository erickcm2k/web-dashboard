import React from "react";

import Navbar from "./Navbar";
import { UnorderedList, ListItem } from "@chakra-ui/react";

const MainNavigation = () => {
  return (
    <Navbar>
      <UnorderedList
        display="flex"
        flexDirection="row"
        alignItems="center"
        height="4rem"
      >
        <ListItem
          flex="1"
          listStyleType="none"
          fontWeight="bold"
          fontSize={["sm", "xl", "xl", "xl"]}
        >
          Panel de Monitoreo
        </ListItem>
      </UnorderedList>
    </Navbar>
  );
};
export default MainNavigation;
