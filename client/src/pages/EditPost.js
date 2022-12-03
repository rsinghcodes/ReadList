import * as Yup from 'yup';
import { Heading, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { FETCH_POST_FOR_UPDATE } from '../util/graphql';
import PostForm from '../components/PostForm';

function EditPost() {
  const { postId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const { data } = useQuery(FETCH_POST_FOR_UPDATE, {
    variables: {
      postId,
    },
  });

  const EditPostSchema = Yup.object().shape({
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
    validationSchema: EditPostSchema,
    onSubmit: () => {
      updatePost();
    },
  });

  const { values, setValues, setErrors } = formik;

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
      ...values,
    },
    update() {
      values.title = '';
      values.desc = '';
      values.body = '';
      navigate('/', { replace: true });
      toast({
        position: 'top',
        description: 'Your Post has been successfully updated.',
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
        Edit Post
      </Heading>
      <PostForm formik={formik} />
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
      email
      likeCount
      likes {
        email
      }
      commentCount
      comments {
        id
        email
        fullname
        createdAt
        body
      }
    }
  }
`;

export default EditPost;
