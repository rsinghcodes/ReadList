import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";

import { AuthContext } from "../context/auth";
import { useForm, Form } from "../util/useForm";

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
    <Form onSubmit={onSubmit}>
      <Stack spacing="24px">
        <Box>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            placeholder="Please enter your username"
            name="username"
            type="text"
            value={values.username}
            isInvalid={errors.username ? true : false}
            onChange={onChange}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="md">
            <Input
              id="password"
              placeholder="Please enter password"
              type={show ? "text" : "password"}
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
        </Box>
        <Flex justifyContent="space-between">
          <Button variant="outline" onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="teal"
            isLoading={loading}
            loadingText="Loging"
            type="submit"
          >
            Login
          </Button>
        </Flex>
      </Stack>
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
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      fullname
      createdAt
      token
    }
  }
`;

export default Login;
