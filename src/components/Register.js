import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import {
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

import { useForm, Form } from "../util/useForm";
import { AuthContext } from "../context/auth";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(registerUser, {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { registerUser: userData } }) {
      context.login(userData);
      history.push("/");
      toast({
        position: "top",
        description: "You have successfully registered.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <Form onSubmit={onSubmit}>
      <Stack spacing="24px">
        <FormControl isInvalid={errors.fullname ? true : false}>
          <FormLabel htmlFor="fullname">Full Name</FormLabel>
          <Input
            id="fullname"
            placeholder="Enter Full Name"
            name="fullname"
            type="text"
            value={values.fullname}
            onChange={onChange}
          />
          {errors.fullname && (
            <FormErrorMessage>{errors.fullname}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.email ? true : false}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Enter email"
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
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
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
        <FormControl isInvalid={errors.confirmPassword ? true : false}>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              id="confirmPassword"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Re-Enter password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={onChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.confirmPassword && (
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          )}
        </FormControl>
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
    </Form>
  );
}

const REGISTER_USER = gql`
  mutation registerUser(
    $fullname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      registerInput: {
        fullname: $fullname
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
