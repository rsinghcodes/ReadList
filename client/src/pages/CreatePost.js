import * as Yup from "yup";
import React from "react";
import { Heading, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import PostForm from "../components/PostForm";

function CreatePost(props) {
  const toast = useToast();

  const CreatePostSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    desc: Yup.string().required("Description is required"),
    body: Yup.string().required("Markdown is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      body: "",
    },
    validationSchema: CreatePostSchema,
    onSubmit: () => {
      createPost();
    },
  });

  const { values, setErrors } = formik;

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
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  return (
    <>
      <Heading fontSize="2xl" mt="5">
        Create Post
      </Heading>
      <PostForm formik={formik} />
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
      email
      likes {
        id
        email
        createdAt
      }
      likeCount
      comments {
        id
        body
        email
        createdAt
      }
      commentCount
    }
  }
`;

export default CreatePost;
