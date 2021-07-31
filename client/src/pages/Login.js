import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Input from "../components/controls/Input";

import { AuthContext } from "../context/auth";
import { useForm, Form } from "../util/useForm";
import Button from "../components/controls/Button";
import { Heading } from "../components/Typography";
import ErrorBox from "../components/controls/ErrorBox";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Heading textTransform="uppercase">Login</Heading>
        <Input
          name="username"
          label="Username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit">Login</Button>{" "}
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
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
