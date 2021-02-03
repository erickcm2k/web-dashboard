import React from "react";
import { Flex, Container, Box, Text } from "@chakra-ui/react";
import TableFiller from "../Components/TableFiller";
const Home = () => {
  return (
    <Container margin="0 auto" minW="90%" justifyContent="center" mt='5'>
      <Flex
        justifyContent="space-around"
        flexDir={["column", "column", "column", "row"]}
      >
        <Box m="1" p="3" overflow="auto">
          <Text textAlign='center' fontWeight='bold' color='teal.400' fontSize='2xl'>Uso de CPU y Memoria</Text>
          <Box>
            <TableFiller mode={"CPU y memoria"} />
          </Box>
        </Box>
        <Box m="1" p="3" overflow="auto">
          <Text textAlign='center' fontWeight='bold' color='teal.400' fontSize='2xl'>Uso de disco</Text>
          <Box>
            <TableFiller mode={"disco"} />
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
