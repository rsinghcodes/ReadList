import { useContext, useEffect, useState } from "react";
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
import { useMutation, useQuery } from "@apollo/react-hooks";

import { useForm, Form } from "../util/useForm";
import { AuthContext } from "../context/auth";
import { gql } from "@apollo/client";

function Profile(props) {
  const context = useContext(AuthContext);
  const userId = context.user.id;
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const { onChange, onSubmit, values, setValues } = useForm(updateData, {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId,
    },
  });

  useEffect(() => {
    if (!data) {
      setValues({});
    } else {
      setValues(data.getUser);
    }
  }, [data, setValues]);

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    update(_, { data: { updateUser: userData } }) {
      context.login(userData);
      history.push("/");
      toast({
        position: "top",
        description: "You have successfully updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function updateData() {
    updateUser();
  }

  return (
    <>
      <Heading fontSize="2xl" my="5" pb="3">
        Your Profile
      </Heading>
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
            <FormLabel htmlFor="email">Your Email</FormLabel>
            <Input
              id="email"
              placeholder="Enter email"
              name="email"
              type="text"
              isDisabled={true}
              value={values.email}
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
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
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
              colorScheme="red"
              // isLoading={loading}
              // loadingText="Saving..."
              // type="submit"
              mr="7"
            >
              Delete my account
            </Button>
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

const FETCH_USER_QUERY = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      fullname
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $fullname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $userId: ID!
  ) {
    updateUser(
      updateInput: {
        fullname: $fullname
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
      userId: $userId
    ) {
      id
      email
      fullname
    }
  }
`;

export default Profile;
