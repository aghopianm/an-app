import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";
import StatusBox from "./StatusBox";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const firstName = user?.name?.split(" ")[0] || "Guest";

  if (!user) {
    return null;
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gap={6}
      py={10}
    >
      <Heading>Hello, {firstName}! Welcome to your feed!</Heading>
      <StatusBox />
    </Box>
  );
}

export default Home;
