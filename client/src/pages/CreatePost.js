import * as Yup from 'yup';
import React from 'react';
import { Heading, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import PostForm from '../components/PostForm';

function CreatePost() {
  const toast = useToast();
  const navigate = useNavigate();

  const CreatePostSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    desc: Yup.string().required('Description is required'),
    body: Yup.string().required('Markdown is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      desc: '',
      body: '',
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
      values.title = '';
      values.desc = '';
      values.body = '';
      navigate('/', { replace: true });
      toast({
        position: 'top',
        description: 'Your Post has been successfully created.',
        status: 'success',
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
  mutation CreatePost($title: String!, $desc: String!, $body: String!) {
    createPost(title: $title, desc: $desc, body: $body) {
      body
      commentCount
      comments {
        id
        body
        email
        createdAt
      }
      createdAt
      desc
      email
      fullname
      id
      likeCount
      title
      slug
      likes {
        id
        email
        createdAt
      }
    }
  }
`;

export default CreatePost;
