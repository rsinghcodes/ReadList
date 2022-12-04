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
  useToast,
} from '@chakra-ui/react';

import { AuthContext } from '../context/auth';

function Register(props) {
  const context = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, 'Fullname is too Short!')
      .max(50, 'Fullname is too Long!')
      .required('Fullname is required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(30, 'Password is too Long!')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(30, 'Password is too Long!')
      .required('Confirm password field is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      addUser();
    },
  });

  const { errors, setErrors, touched, values, handleSubmit, getFieldProps } =
    formik;

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate('/', { replace: true });
      toast({
        position: 'top',
        description: 'You have successfully registered.',
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
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing="24px">
          <FormControl isInvalid={Boolean(touched.fullname && errors.fullname)}>
            <FormLabel htmlFor="fullname">Full Name</FormLabel>
            <Input
              id="fullname"
              placeholder="Enter Full Name"
              name="fullname"
              type="text"
              {...getFieldProps('fullname')}
            />
            <FormErrorMessage>
              {touched.fullname && errors.fullname}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(touched.email && errors.email)}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="Enter email"
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
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
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
          <FormControl
            isInvalid={Boolean(
              touched.confirmPassword && errors.confirmPassword
            )}
          >
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                id="confirmPassword"
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Re-Enter password"
                name="confirmPassword"
                {...getFieldProps('confirmPassword')}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {touched.confirmPassword && errors.confirmPassword}
            </FormErrorMessage>
          </FormControl>
          <Flex justifyContent="space-between">
            <Button variant="outline" onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              isLoading={loading}
              loadingText="Registering"
              type="submit"
            >
              Register
            </Button>
          </Flex>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

const REGISTER_USER = gql`
  mutation registerUser(
    $fullname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
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
      role
    }
  }
`;

export default Register;
