import { Heading, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useForm } from "../util/useForm";
import PostForm from "../components/PostForm";

function EditPost() {
  const { postId } = useParams();
  const toast = useToast();
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(updatePostCallback, {
    title: "",
    desc: "",
    body: "",
  });

  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    variables: {
      postId,
      title: values.title,
      desc: values.desc,
      body: values.body,
    },
    update() {
      toast({
        position: "top",
        description: "Your Post has been successfully updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      values.title = "";
      values.desc = "";
      values.body = "";
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function updatePostCallback() {
    updatePost();
  }
  return (
    <>
      <Heading fontSize="2xl" mt="5">
        Edit Post
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

const UPDATE_POST_MUTATION = gql`
  mutation updatePost(
    $postId: ID!
    $title: String!
    $desc: String!
    $body: String!
  ) {
    updatePost(postId: $postId, title: $title, desc: $desc, body: $body) {
      id
      title
      desc
      sanitizedHtml
      slug
      createdAt
      fullname
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        fullname
        createdAt
        body
      }
    }
  }
`;

export default EditPost;
