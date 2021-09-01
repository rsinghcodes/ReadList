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

import { useForm, Form } from "../util/useForm";
import { AuthContext } from "../context/auth";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const { onChange, onSubmit, values } = useForm(registerUser, {
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <Form onSubmit={onSubmit}>
      <Stack spacing="24px">
        <Box>
          <FormLabel htmlFor="fullname">Full Name</FormLabel>
          <Input
            id="fullname"
            placeholder="Enter Full Name"
            name="fullname"
            type="text"
            value={values.fullname}
            isInvalid={errors.fullname ? true : false}
            onChange={onChange}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            placeholder="Enter username"
            name="username"
            type="text"
            value={values.username}
            isInvalid={errors.username ? true : false}
            onChange={onChange}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Enter email"
            name="email"
            type="text"
            value={values.email}
            isInvalid={errors.email ? true : false}
            onChange={onChange}
          />
        </Box>
        <Box>
          <FormLabel htmlFor="password">Password</FormLabel>
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
        </Box>
        <Box>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              id="confirmPassword"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Re-Enter password"
              name="confirmPassword"
              value={values.confirmPassword}
              isInvalid={errors.confirmPassword ? true : false}
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
            loadingText="Registering"
            type="submit"
          >
            Register
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

const REGISTER_USER = gql`
  mutation register(
    $fullname: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        fullname: $fullname
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      fullname
      createdAt
      token
    }
  }
`;

export default Register;
