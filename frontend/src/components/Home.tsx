import { useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import { Box, Heading, Button } from "@chakra-ui/react";
import { Avatar } from "../components/ui/Avatar";
import StatusBox from "./StatusBox";

function Home() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.login.user);

  // Extract first name for greeting
  const firstName = user?.name.split(" ")[0] || "Guest";

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center" p="4">
        {/* Dynamically pass the user's name */}
        <Avatar name={user?.name || "Guest"} />
        <Button
          bg="red.600"
          _hover={{ bg: "red.500" }}
          onClick={() => navigate("/logout")}
        >
          Logout
        </Button>
      </Box>
      <hr />

      <Box display="flex" justifyContent="center" alignItems="center" textAlign="center" flexDirection="column" gap={6} py={10}>
        <Heading>Hello, {firstName}! Welcome to your feed!</Heading>
        <StatusBox />
      </Box>
    </Box>
  );
}

export default Home;
