import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Checkbox,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { useRouter } from 'next/router'; 
import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});


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
const msg = 'Required'
  return (
    <form onSubmit={handleSubmit}>
    <FormControl mb={6}>
      <FormLabel>Username</FormLabel>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errorMessage && (
        <Alert status="error" fontSize="12px" bg="none">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
    </FormControl>
    <FormControl mb={6} mt={5}>
      <FormLabel>Password</FormLabel>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && (
        <Alert status="error" fontSize="12px" bg="none">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
    </FormControl>
    <FormControl mb={4}>
      <Checkbox name="rememberMe">Remember Me</Checkbox>
    </FormControl>
    <Button type="submit" size="lg">
      Login
    </Button>
  </form>
  

    // <Formik
    //   initialValues={{ username: "", password: "", rememberMe: false }}
    //   validationSchema={validationSchema}
    //   onSubmit={handleSubmit}
    // >
    //   <Form>
    //     <FormControl>
    //       <FormLabel>Username</FormLabel>
    //       <Field as={Input} type="text" name="username" />
    //       <ErrorMessage name="username">
    //         {(msg: string) => <Alert status="error">{msg}</Alert>}
    //       </ErrorMessage>
    //     </FormControl>
    //     <FormControl mt={4}>
    //       <FormLabel>Password</FormLabel>
    //       <Field as={Input} type="password" name="password" />
    //       <ErrorMessage name="password">
    //         {(msg: string) => <Alert status="error">{msg}</Alert>}
    //       </ErrorMessage>
    //     </FormControl>
    //     <FormControl mt={16}>
    //       <Checkbox name="rememberMe">Remember Me</Checkbox>
    //     </FormControl>
    //     <Button type="submit" mt={4}>
    //       Login
    //     </Button>
    //   </Form>
    // </Formik>
  );
};

