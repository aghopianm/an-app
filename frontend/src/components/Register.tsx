import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Input, Heading, Text } from "@chakra-ui/react";
import { registerUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store"; // Update your RootState import

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  // Get auth state from Redux
  const { error, status } = useSelector((state: RootState) => state.auth);

  async function handleRegister(): Promise<void> {
    const resultAction = await dispatch(registerUser({ name, email, password }));
    
    // Navigate to login page only if registration is successful
    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
  }

  return (
    <Box width="300px" margin="auto" mt="100px">
      <Heading mb="6">Register</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <div>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb="4"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="4"
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
        bg="blue.500"
        _hover={{ bg: "blue.400" }}
        width="full"
        onClick={handleRegister}
        loading={status === 'loading'}
        loadingText="Registering"
      >
        Register
      </Button>
      <Button
        mt="4"
        bg="green.500"
        _hover={{ bg: "green.400" }}
        width="full"
        onClick={() => navigate("/")}
      >
        Go Back
      </Button>
    </Box>
  );
}

export default Register;