import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Form, useForm } from "../util/useForm";

const AdminRegister = () => {
  const initialRef = React.useRef();

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const toast = useToast();

  const { onChange, onSubmit, values } = useForm(registerAdmin, {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addAdmin, { loading }] = useMutation(REGISTER_ADMIN, {
    update() {
      toast({
        position: "top",
        description: "Admin successfully registered.",
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

  function registerAdmin() {
    addAdmin();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Stack spacing="24px">
          <FormControl isInvalid={errors.fullname ? true : false}>
            <FormLabel htmlFor="fullname">Full Name</FormLabel>
            <Input
              ref={initialRef}
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
            {errors.email && (
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            )}
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
          <Button
            colorScheme="teal"
            isLoading={loading}
            loadingText="Registering"
            type="submit"
          >
            Register
          </Button>
        </Stack>
      </Form>
    </>
  );
};

const REGISTER_ADMIN = gql`
  mutation registerAdmin(
    $fullname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerAdmin(
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

export default AdminRegister;
