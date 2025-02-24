import { Box, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../components/ui/Avatar";
import StatusBox from "./StatusBox";

function Home() {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* Top bar with Avatar and Logout Button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p="4"
      >
        <Avatar name="Minas Aghopian" />
        <Button
          bg="red.600"
          _hover={{ bg: "red.500" }}
          onClick={() => navigate("/logout")}
        >
          Logout
        </Button>
      </Box>
      <hr />

      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flexDirection="column"  // Align the status box underneath the heading
        gap={6}  // Space out elements vertically
      >
        <Heading>Hello, welcome to your feed!</Heading>
        
        {/* Add the StatusBox here */}
        <StatusBox />
      </Box>
    </Box>
  );
}

export default Home;
