import * as Yup from "yup";
import gql from "graphql-tag";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useFormik, Form, FormikProvider } from "formik";
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

import { AuthContext } from "../context/auth";

function UpdateProfile() {
  const context = useContext(AuthContext);
  const userId = context.user.id;
  const [show, setShow] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const UpdateProfileSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, "Fullname is too Short!")
      .max(50, "Fullname is too Long!")
      .required("Fullname is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password is too Long!")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password is too Long!")
      .required("Confirm password field is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: UpdateProfileSchema,
    onSubmit: () => {
      updateUser();
    },
  });

  const { errors, setErrors, touched, values, handleSubmit, getFieldProps } =
    formik;

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
      ...values,
      userId,
    },
  });

  return (
    <>
      <Heading fontSize="2xl" my="5" pb="3">
        Update Profile
      </Heading>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing="24px">
            <FormControl
              isInvalid={Boolean(touched.fullname && errors.fullname)}
            >
              <FormLabel htmlFor="fullname">Full Name</FormLabel>
              <Input
                id="fullname"
                placeholder="Enter new Full Name"
                name="fullname"
                type="text"
                {...getFieldProps("fullname")}
              />
              <FormErrorMessage>
                {touched.fullname && errors.fullname}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={Boolean(touched.password && errors.password)}
            >
              <FormLabel htmlFor="password">New Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter new password"
                  name="password"
                  {...getFieldProps("password")}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {touched.password && errors.password}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={Boolean(
                touched.confirmPassword && errors.confirmPassword
              )}
            >
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
                  {...getFieldProps("confirmPassword")}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {touched.confirmPassword && errors.confirmPassword}
              </FormErrorMessage>
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
      </FormikProvider>
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
