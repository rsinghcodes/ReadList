import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import { useForm, Form } from "../../util/useForm";

const AdminLogin = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(loginAdminCallback, {
    email: "",
    password: "",
  });

  const [loginAdmin, { loading }] = useMutation(LOGIN_ADMIN, {
    update(_, { data: { loginAdmin: userData } }) {
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
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginAdminCallback() {
    loginAdmin();
  }

  return (
    <Center h="auto" padding={10}>
      <Box maxW="sm" w="sm" borderWidth="1px" borderRadius="lg" padding={6}>
        <Heading as="h4" size="md">
          Admin Login
        </Heading>
        <Divider orientation="horizontal" my={4} />
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
              {errors.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
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

            <Button
              colorScheme="teal"
              isLoading={loading}
              loadingText="Loging"
              type="submit"
            >
              Login
            </Button>
          </Stack>
        </Form>
      </Box>
    </Center>
  );
};

const LOGIN_ADMIN = gql`
  mutation loginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      id
      email
      fullname
      createdAt
      token
    }
  }
`;

export default AdminLogin;
