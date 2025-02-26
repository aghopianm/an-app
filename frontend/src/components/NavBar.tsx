import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { logout } from "../slices/authSlice";
import SearchBar from "./SearchBar";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Box bg="blue.500" p="4">
      <Flex justify="space-between" align="center">
        <Button
          bg="pastel.500"
          _hover={{ bg: "pastel.400" }}
          onClick={() => navigate("/home")}
        >
          Home
        </Button>
        <SearchBar />
        <Button bg="red.600" _hover={{ bg: "red.500" }} onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default NavBar;