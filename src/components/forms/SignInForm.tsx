import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import the useRouter hook

export const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter(); // Initialize the useRouter hook

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/v1/login', {
        username,
        password,
      });

      console.log(response.data.message);
      setErrorMessage('');
      const token = response.data.token;
      localStorage.setItem('token', token);

console.log('get token and set token', token);
      router.push('/current'); 
    } catch (error) {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button type="submit" mt={4}>
        Login
      </Button>
      {errorMessage && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
    </form>
  );
};
