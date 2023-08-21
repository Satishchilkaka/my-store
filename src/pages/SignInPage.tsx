import React from "react";
import { Container } from "@chakra-ui/react";
import {SignInForm} from  '@/components/forms/SignInForm'

export const SignInPage: React.FC = () => {
  return (
    <Container>
      <h1>Sign In</h1>
      <SignInForm />
    </Container>
  );
};

