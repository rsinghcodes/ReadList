import * as Yup from 'yup';
import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { FETCH_POSTS_QUERY } from '../utils/graphql';
import PostForm from '../components/PostForm';

function CreatePost() {
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

  const { values, setErrors, resetForm } = formik;

  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(client, { data }) {
      const { getPosts } = client.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      client.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [data.createPost, ...getPosts],
        },
      });
    },
    onCompleted() {
      resetForm();
      navigate('/');
      toast.success('Post published successfully 🎉', {
        duration: 2500,
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
      <PostForm formik={formik} loading={loading} />
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $desc: String!, $body: String!) {
    createPost(title: $title, desc: $desc, body: $body) {
      id
      title
      body
      desc
      sanitizedHtml
      slug
      fullname
      createdAt
    }
  }
`;

export default CreatePost;
