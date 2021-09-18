import React, { useState } from "react";
import { Heading, useToast } from "@chakra-ui/react";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/useForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import PostForm from "../components/PostForm";

function CreatePost(props) {
  const toast = useToast();
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
      values.title = "";
      values.desc = "";
      values.body = "";
      props.history.push("/");
      toast({
        position: "top",
        description: "Your Post has been successfully created.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
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
      <Heading fontSize="2xl" mt="5">
        Create Post
      </Heading>
      <PostForm
        values={values}
        onChange={onChange}
        onSubmit={onSubmit}
        errors={errors}
      />
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
      slug
      createdAt
      fullname
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

export default CreatePost;
