import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Heading,
  FormControl,
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/react-hooks";

import { useForm, Form } from "../util/useForm";
import { AuthContext } from "../context/auth";
import { gql } from "@apollo/client";

function UpdateProfile() {
  const context = useContext(AuthContext);
  const userId = context.user.id;
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(updateData, {
    fullname: "",
    password: "",
    confirmPassword: "",
  });

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    update(_, { data: { updateUser: userData } }) {
      context.login(userData);
      history.push("/");
      toast({
        position: "top",
        description: "You password successfully updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      fullname: values.fullname,
      password: values.password,
      confirmPassword: values.confirmPassword,
      userId,
    },
  });

  function updateData() {
    updateUser();
  }

  return (
    <>
      <Heading fontSize="2xl" my="5" pb="3">
        Update Profile
      </Heading>
      <Form onSubmit={onSubmit}>
        <Stack spacing="24px">
          <FormControl isInvalid={errors.fullname ? true : false}>
            <FormLabel htmlFor="fullname">Full Name</FormLabel>
            <Input
              id="fullname"
              placeholder="Enter new Full Name"
              name="fullname"
              type="text"
              value={values.fullname}
              onChange={onChange}
            />
            {errors.fullname && (
              <FormErrorMessage>{errors.fullname}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.password ? true : false}>
            <FormLabel htmlFor="password">New Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter new password"
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
            <FormLabel htmlFor="confirmPassword">
              Confirm new Password
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="confirmPassword"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Re-Enter new password"
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
      </Form>
    </>
  );
}

const UPDATE_USER = gql`
  mutation updateUser(
    $fullname: String!
    $password: String!
    $confirmPassword: String!
    $userId: ID!
  ) {
    updateUser(
      updateInput: {
        fullname: $fullname
        password: $password
        confirmPassword: $confirmPassword
      }
      userId: $userId
    ) {
      id
      email
      fullname
      createdAt
      token
    }
  }
`;

export default UpdateProfile;
