import React, { useState } from "react";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm, Form } from "../util/useForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function PostForm() {
  const [errors, setErrors] = useState({});
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    title: "",
    desc: "",
    body: "",
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.desc = "";
      values.body = "";
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Box mt="5">
          <Input
            placeholder="Write title here..."
            name="title"
            value={values.title}
            onChange={onChange}
          />
        </Box>
        <Box my="5">
          <Input
            placeholder="Write description here..."
            name="desc"
            value={values.desc}
            onChange={onChange}
          />
        </Box>
        <Box my="5">
          <Textarea
            name="body"
            value={values.body}
            placeholder="Enter markdown here..."
            onChange={onChange}
          />
        </Box>

        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
        {Object.keys(errors).length > 0 && (
          <Box mt="4">
            {Object.values(errors).map((value) => (
              <Alert status="error" key={value} my="1">
                <AlertIcon />
                {value}
              </Alert>
            ))}
          </Box>
        )}
      </Form>
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $desc: String!, $body: String!) {
    createPost(title: $title, desc: $desc, body: $body) {
      id
      title
      desc
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
