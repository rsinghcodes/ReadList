import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useFormik, Form, FormikProvider } from 'formik';
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import { FETCH_ADMINS_QUERY } from '../utils/graphql';

const AdminRegister = () => {
  const initialRef = React.useRef();
  const [show, setShow] = useState(false);

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
      addAdmin();
    },
  });

  const {
    errors,
    setErrors,
    touched,
    values,
    resetForm,
    handleSubmit,
    getFieldProps,
  } = formik;

  const [addAdmin, { loading }] = useMutation(REGISTER_ADMIN, {
    update(client, { data }) {
      const { getAdmins } = client.readQuery({
        query: FETCH_ADMINS_QUERY,
      });
      client.writeQuery({
        query: FETCH_ADMINS_QUERY,
        data: {
          getAdmins: [...getAdmins, data.registerAdmin],
        },
      });
    },
    onCompleted() {
      resetForm();
      toast.success('Admin successfully registered.', {
        duration: 2500,
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
              ref={initialRef}
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
          <FormControl isInvalid={errors.email ? true : false}>
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
          <Button
            colorScheme="teal"
            isLoading={loading}
            loadingText="Registering"
            type="submit"
          >
            Register
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

const REGISTER_ADMIN = gql`
  mutation registerAdmin(
    $fullname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerAdmin(
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
    }
  }
`;

export default AdminRegister;
