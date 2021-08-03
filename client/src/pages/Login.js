import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";

import { useForm, Form } from "../util/useForm";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
      <Box p="6" minW="md" borderWidth="1px" borderRadius="md">
        <Form onSubmit={onSubmit}>
          <Heading fontSize="3xl">Login</Heading>
          <FormControl id="username" mt="4">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter username"
              name="username"
              type="text"
              value={values.username}
              isInvalid={errors.username ? true : false}
              onChange={onChange}
            />
          </FormControl>
          <FormControl id="password" mt="4">
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={values.password}
                isInvalid={errors.password ? true : false}
                onChange={onChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            isLoading={loading}
            loadingText="Loging"
            type="submit"
            mt="4"
            width="100%"
          >
            Login
          </Button>
          <Center h="20px" mt="4">
            <Text>
              Not registered yet?{" "}
              <ChakraLink as={Link} to="/register">
                Register here!
              </ChakraLink>
            </Text>
          </Center>
          {Object.keys(errors).length > 0 && (
            <Box mt="4">
              {Object.values(errors).map((value) => (
                <Alert status="error" key={value} my="1">
                  <AlertIcon />
                  {value}
                </Alert>
              ))}
            </Box>
          )}
        </Form>
      </Box>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
