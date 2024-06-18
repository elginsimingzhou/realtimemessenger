import {
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username required")
        .min(6, "Require longer username")
        .max(28, "Require shorter username"),
      password: Yup.string()
        .required("Password required")
        .min(6, "Require longer password")
        .max(28, "Require shorter password"),
    }),
    onSubmit: (values, actions) => {
      const vals = { ...values };
      // alert(JSON.stringify(values, null, 2));
      actions.resetForm();
      fetch("http://localhost:4000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vals),
      })
        .catch((err) => {
          console.log(err);
          return;
        })
        .then((res) => {
          if (!res || !res.ok || res.status >= 400) {
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          console.log(data);
        });
    },
  });
  return (
    <VStack
      as="form"
      w={{ base: "90%", md: "500px" }}
      m="auto"
      justify="center"
      h="100vh"
      spacing="1rem"
      onSubmit={() => {
        formik.handleSubmit();
      }}
    >
      <Heading>Log in </Heading>
      <FormControl
        isInvalid={
          formik.errors.username && formik.touched.username ? true : undefined
        }
      >
        <FormLabel fontSize="lg">Username</FormLabel>
        <Input
          placeholder="Enter username"
          autoComplete="off"
          {...formik.getFieldProps("username")} // Condense bottom 4 lines into 1 line
          //   name="username"
          //   value={formik.values.username}
          //   onChange={formik.handleChange}
          //   onBlur={formik.handleBlur}
        />
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={
          formik.errors.password && formik.touched.password ? true : undefined
        }
      >
        <FormLabel fontSize="lg">Password</FormLabel>
        <Input
          placeholder="Enter password"
          autoComplete="off"
          type="password"
          {...formik.getFieldProps("password")}
          //   name="password"
          //   name="password"
          //   value={formik.values.password}
          //   onChange={formik.handleChange}
          //   onBlur={formik.handleBlur}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <ButtonGroup pt="1rem">
        <Button type="submit" colorScheme="teal">
          Log in
        </Button>
        <Button
          onClick={() => {
            navigate("/register");
          }}
        >
          Create Account
        </Button>
      </ButtonGroup>
    </VStack>
  );
};

export default Login;
