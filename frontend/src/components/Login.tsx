import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { loginUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store"; // Update your RootState import

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Get auth state from Redux
  const { isLoggedIn, error, status } = useSelector(
    (state: RootState) => state.auth
  );

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  async function handleLogin(): Promise<void> {
    dispatch(loginUser({ email, password }));
  }

  return (
    <Box width="300px" margin="auto" mt="100px">
      <Image
        src="/Facebook.svg"
        alt="Login Image"
        borderRadius="full"
        boxSize="150px"
        margin="auto"
        mr="4"
      />
      <Heading mb="6">Login</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <div>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mr="4"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb="4"
        />
      </div>
      <Button
        bg="blue.600"
        _hover={{ bg: "blue.400" }}
        width="full"
        onClick={handleLogin}
        isLoading={status === "loading"}
        loadingText="Logging in"
      >
        Login
      </Button>
      <Text mt="4">
        Don't have an account?{" "}
        <Button
          bg="blue.500"
          _hover={{ bg: "blue.400" }}
          onClick={() => navigate("/register")}
          ml="9"
        >
          Register
        </Button>
      </Text>
    </Box>
  );
}

export default Login;
