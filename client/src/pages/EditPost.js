import { Heading, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useForm } from "../util/useForm";
import { FETCH_POST_FOR_UPDATE } from "../util/graphql";
import PostForm from "../components/PostForm";

function EditPost() {
  const { postId } = useParams();
  const toast = useToast();
  const [errors, setErrors] = useState({});

  const { data } = useQuery(FETCH_POST_FOR_UPDATE, {
    variables: {
      postId,
    },
  });

  const { values, setValues, onChange, onSubmit } = useForm(
    updatePostCallback,
    {
      title: "",
      desc: "",
      body: "",
    }
  );

  useEffect(() => {
    if (!data) {
      setValues({});
    } else {
      setValues(data.getPostforUpdate);
    }
  }, [data, setValues]);

  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    variables: {
      postId,
      title: values.title,
      desc: values.desc,
      body: values.body,
    },
    update() {
      values.title = "";
      values.desc = "";
      values.body = "";
      toast({
        position: "top",
        description: "Your Post has been successfully updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
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
