import { Box, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../components/ui/Avatar";

function Home() {
  const navigate = useNavigate();

  return (
    <Box position="relative" minH="100vh">
      <Box position="absolute" top="4" right="4">
        <Button bg="red.600" _hover={{ bg: "red.500" }} onClick={() => navigate("/logout")}>Logout</Button>
      </Box>

      <Box textAlign="center" pt="100px">
        <Heading>Hello, welcome to your feed!</Heading>
        <Avatar name="Minas Aghopian" />
      </Box>
    </Box>
  );
}

export default Home;
