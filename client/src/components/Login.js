import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";

import { AuthContext } from "../context/auth";
import { useForm, Form } from "../util/useForm";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [accessError, setAccessError] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: userData } }) {
      context.login(userData);
      history.push("/");
      toast({
        position: "top",
        description: "You have successfully logged in.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError(err) {
      if (err.graphQLErrors[0].extensions.errors) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
      if (
        err.graphQLErrors[0].extensions.exception.stacktrace[0] ===
        "ForbiddenError: Access denied!"
      ) {
        setAccessError(err.graphQLErrors[0].extensions.exception.stacktrace[0]);
        setErrors({});
      }
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Form onSubmit={onSubmit}>
      <Stack spacing="24px">
        <FormControl isInvalid={errors.email ? true : false}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Please enter your email"
            name="email"
            type="text"
            value={values.email}
            onChange={onChange}
          />
          {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.password ? true : false}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="md">
            <Input
              id="password"
              placeholder="Please enter password"
              type={show ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={onChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          )}
        </FormControl>
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
        {accessError && (
          <Alert status="error">
            <AlertIcon />
            Account access denied!
          </Alert>
        )}
      </Stack>
    </Form>
  );
}

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      fullname
      createdAt
      token
    }
  }
`;

export default Login;
