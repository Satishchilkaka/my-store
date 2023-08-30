import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  FormErrorMessage,
  Flex,
  Box,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import { Layout } from '@/components/Layout';
import { SignInForm } from '@/components/forms/SignInForm';

const LoginPage: React.FC = () => {
  const handleSubmit = (values: any, actions: any) => {
    console.log('Form values:', values);
    actions.setSubmitting(false);
  };

  return (
    <Layout title='Sign in' noHeader={true} withNoMenus={true}>
<Flex minH={'400px'}
flexDirection={'column'}
justifyContent={'space-between'}
alignItems={'center'}
>
    <Box mt={105} display={'flex'}>
        
 <Heading fontSize={'2xl'} mb={12}>
    SIGN IN
 </Heading>
      </Box>
      {/* <Formik
        initialValues={{ username: '', password: '', rememberMe: false }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <Field name="username">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    {...field}
                    id="username"
                    placeholder="Enter your username"
                  />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }: any) => (
                <FormControl
                  mt={4}
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="rememberMe">
              {({ field }: any) => (
                <Checkbox mt={4} {...field}>
                  Remember Me
                </Checkbox>
              )}
            </Field>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Log In
            </Button>
          </Form>
        )}
      </Formik> */}
      <SignInForm/>
      </Flex>
    </Layout>
   
  );
};

export default LoginPage;
