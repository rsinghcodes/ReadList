import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm, Form } from "../util/useForm";
import Input from "../components/controls/Input";
import Button from "../components/controls/Button";
import { Heading } from "../components/Typography";
import ErrorBox from "../components/controls/ErrorBox";

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Heading textTransform="uppercase">Register</Heading>
        <Input
          name="username"
          label="Username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={onChange}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Input
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit">Register</Button>
        {Object.keys(errors).length > 0 && (
          <ErrorBox>
            <ul>
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </ErrorBox>
        )}
      </Form>
    </>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
