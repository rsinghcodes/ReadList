import { useContext, useEffect, useState } from "react";
import {
  Heading,
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/react-hooks";

import { useForm, Form } from "../util/useForm";
import { AuthContext } from "../context/auth";
import { gql } from "@apollo/client";

function Profile(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const toast = useToast();

  const { onChange, onSubmit, values, setValues } = useForm(updateData, {
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!context.user) {
      setValues({});
    } else {
      setValues(context.user);
    }
  }, [context.user, setValues]);

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    update(_, { data: { updateUser: userData } }) {
      context.login(userData);
      props.history.push("/");
      toast({
        position: "top",
        description: "You have successfully updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function updateData() {
    updateUser();
  }

  return (
    <>
      <Heading fontSize="2xl" my="5" borderBottom="1px" pb="3">
        Profile
      </Heading>
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
            <FormLabel htmlFor="email">Your Email</FormLabel>
            <Input
              id="email"
              placeholder="Enter email"
              name="email"
              type="text"
              isDisabled={true}
              value={values.email}
              isInvalid={errors.email ? true : false}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter new password"
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
                placeholder="Re-Enter new password"
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
          <Flex justifyContent="flex-end">
            <Button
              colorScheme="teal"
              isLoading={loading}
              loadingText="Saving..."
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </Stack>
        {/* ---------------- Error handling ------------------ */}
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
    </>
  );
}

const UPDATE_USER = gql`
  mutation updateUser(
    $fullname: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
    $userId: ID!
  ) {
    updateUser(
      updateInput: {
        fullname: $fullname
        username: $username
        password: $password
        confirmPassword: $confirmPassword
      }
      userId: $userId
    ) {
      id
      email
      fullname
      password
      confirmPassword
    }
  }
`;

export default Profile;
