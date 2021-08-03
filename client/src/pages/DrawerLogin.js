import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { AuthContext } from "../context/auth";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useForm, Form } from "../util/useForm";

function DrawerLogin(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
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
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Login
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Login to your account
          </DrawerHeader>

          <DrawerBody>
            <Form onSubmit={onSubmit}>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    id="username"
                    placeholder="Please enter user name"
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
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShow(!show)}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Flex justifyContent="space-between">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    isLoading={loading}
                    loadingText="Loging"
                    type="submit"
                  >
                    Login
                  </Button>
                </Flex>
              </Stack>
            </Form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" justifyContent="center">
            <Text>
              Not registered yet?{" "}
              <ChakraLink as={Link} to="/register" onClick={onClose}>
                Register here!
              </ChakraLink>
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
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

export default DrawerLogin;
