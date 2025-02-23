// src/components/Login.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Input, Heading } from '@chakra-ui/react';
import { setUser } from '../slices/loginSlice';
import axios from 'axios'; // Import Axios

// Define the type for the user data
type UserData = {
  email: string;
  name: string;
}

// Traditional function declaration for the Login component
function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Traditional function for handling login
  async function handleLogin(): Promise<void> {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email,
        password,
      });

      if (response.status === 200) {
        const userData: UserData = response.data; // Assuming the response contains user data
        dispatch(setUser(userData)); // Dispatch the setUser action with actual user data
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <Box width="300px" margin="auto" mt="100px">
      <Heading mb="6">Login</Heading>
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
      <Button colorScheme="teal" width="full" onClick={handleLogin}>Login</Button>
    </Box>
  );
}

export default Login;