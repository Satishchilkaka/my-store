import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Checkbox,
  Box,
  Flex,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {RememberMeCheckbox} from '@/components/customComponents/RememberMeCheckbox'
const API = process.env.NEXT_PUBLIC_API_URL;
interface FormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post(`${API}/v1/login`, {
        username: values.username,
        password: values.password,
      });

      console.log(response.data.message);
      setErrorMessage("");
      const token = response.data.token;
      localStorage.setItem("token", token);

      console.log("get token and set token", token);
      router.push("/current");
    } catch (error) {
      setErrorMessage("Invalid credentials");
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl mb={10} h="68px">
        <FormLabel>Username</FormLabel>
        <div style={{ width: "100%" }}>
          <Input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.username && !!formik.errors.username}
            width="100%"
          />
          {formik.touched.username && formik.errors.username ? (
            <Box color="red" fontSize="small" marginTop="4px">
              {formik.errors.username}
            </Box>
          ) : null}
        </div>
      </FormControl>
      <FormControl mb={10} mt={5} h="68px">
        <FormLabel>Password</FormLabel>
        <div style={{ width: "100%" }}>
          <Input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && !!formik.errors.password}
            width="100%"
          />
          {formik.touched.password && formik.errors.password ? (
            <Box color="red" fontSize="small" marginTop="4px">
              {formik.errors.password}
            </Box>
          ) : null}
        </div>
      </FormControl>

      <FormControl mb={2}>
      <RememberMeCheckbox onToggle={setRememberMe} />
      </FormControl>

      <Button type="submit"  variant= {'primary'}size="lg" mt={3} mb={5} width="70%">
        Sign In
      </Button>

      {errorMessage && (
        <Alert status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <Flex justifyContent="space-between" alignItems="center" mt={10}>
        <Box>
        <Button variant="link">Forgot Password</Button>

        </Box>
        <Box>
      <Link href="/signup"> 
      {/* add new route in API and update */}
        <Button variant= {'primary'} ml={15} display="flex">
          Sign Up
        </Button>
      </Link>
    </Box>
 
      </Flex>
    </form>
  );
};
