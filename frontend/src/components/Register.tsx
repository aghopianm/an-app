import { useState } from "react";
import { Box, Button, Input, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(): Promise<void> {
    try {
      await axios.post("http://127.0.0.1:5000/api/register", {
        name,
        email,
        password,
      });
      navigate("/"); // Redirect to login
    } catch (error: any) {
      setError(error.response?.data?.error || "Registration failed");
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
      <Button colorScheme="teal" width="full" onClick={handleRegister}>
        Register
      </Button>
    </Box>
  );
}

export default Register;
