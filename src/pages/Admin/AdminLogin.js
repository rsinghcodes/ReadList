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
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

const AdminLogin = () => {
  const context = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      loginAdmin();
    },
  });

  const { errors, setErrors, touched, values, handleSubmit, getFieldProps } =
    formik;

  const [loginAdmin, { loading }] = useMutation(LOGIN_ADMIN, {
    update(_, { data: { loginAdmin: userData } }) {
      context.login(userData);
      navigate('/', { replace: true });
      toast({
        position: 'top',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  return (
    <Center h="auto" padding={10}>
      <Box maxW="sm" w="sm" borderWidth="1px" borderRadius="lg" padding={6}>
        <Heading as="h4" size="md">
          Admin Login
        </Heading>
        <Divider orientation="horizontal" my={4} />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing="24px">
              <FormControl isInvalid={Boolean(touched.email && errors.email)}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  placeholder="Please enter your email"
                  name="email"
                  type="text"
                  {...getFieldProps('email')}
                />
                <FormErrorMessage>
                  {touched.email && errors.email}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={Boolean(touched.password && errors.password)}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    id="password"
                    placeholder="Please enter password"
                    type={show ? 'text' : 'password'}
                    name="password"
                    {...getFieldProps('password')}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {touched.password && errors.password}
                </FormErrorMessage>
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
        </FormikProvider>
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
      role
    }
  }
`;

export default AdminLogin;
