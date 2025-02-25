import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Input, Heading, Text, Image } from "@chakra-ui/react";
import { setUser } from "../slices/loginSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserData = {
  email: string;
  name: string;
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use for navigation
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(): Promise<void> {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { user, token } = response.data; // Get token from response
        dispatch(setUser(user)); // Store user info in Redux
        localStorage.setItem("token", token); // Store token in localStorage
        console.log("Login successful:", user);
        console.log("Auth Token:", token); // Log the token
        navigate("/home");
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "Login failed");
    }
  }

  return (
    <Box width="300px" margin="auto" mt="100px">
      <Image
        src="/sigma.jpg"
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
