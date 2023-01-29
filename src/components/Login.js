import * as Yup from 'yup';
import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
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
} from '@chakra-ui/react';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../context/auth';

function Login(props) {
  const context = useContext(AuthContext);
  const [show, setShow] = useState(false);
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
    },
    onCompleted() {
      navigate('/');
      toast.success('LoggedIn successfully', {
        duration: 2500,
      });
    },
    onError(err) {
      if (err.graphQLErrors[0].extensions.errors) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
      if (err.graphQLErrors[0].extensions.code === 'FORBIDDEN_ERROR') {
        toast.error('Access Denied!', {
          duration: 2500,
        });
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
