import * as Yup from 'yup';
import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Alert,
  AlertIcon,
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
} from '@chakra-ui/react';

import { AuthContext } from '../context/auth';

function Login(props) {
  const context = useContext(AuthContext);
  const [accessError, setAccessError] = useState(false);
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
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      loginUser();
    },
  });

  const { errors, setErrors, touched, values, handleSubmit, getFieldProps } =
    formik;

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: userData } }) {
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
      if (err.graphQLErrors[0].extensions.errors) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
      if (err.graphQLErrors[0].extensions.code === 'FORBIDDEN') {
        setAccessError(true);
        setErrors({});
      }
    },
    variables: values,
  });

  return (
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
            <FormErrorMessage>{touched.email && errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(touched.password && errors.password)}>
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
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {touched.password && errors.password}
            </FormErrorMessage>
          </FormControl>
          <Flex justifyContent="space-between">
            <Button variant="outline" onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              isLoading={loading}
              loadingText="Loging"
              type="submit"
            >
              Login
            </Button>
          </Flex>
          {accessError && (
            <Alert status="error">
              <AlertIcon />
              Account access denied!
            </Alert>
          )}
        </Stack>
      </Form>
    </FormikProvider>
  );
}

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      fullname
      createdAt
      token
      role
    }
  }
`;

export default Login;
