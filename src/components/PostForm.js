import React from 'react';
import { Form, FormikProvider } from 'formik';
import {
  FormControl,
  Button,
  Input,
  Textarea,
  Link,
  Flex,
  FormErrorMessage,
  Box,
} from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

function PostForm({ formik, loading }) {
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
        <FormControl mt="5" isInvalid={Boolean(touched.title && errors.title)}>
          <Input
            placeholder="Write title here..."
            name="title"
            {...getFieldProps('title')}
          />
          <FormErrorMessage>{touched.title && errors.title}</FormErrorMessage>
        </FormControl>
        <FormControl my="5" isInvalid={Boolean(touched.desc && errors.desc)}>
          <Input
            placeholder="Write description here..."
            name="desc"
            {...getFieldProps('desc')}
          />
          <FormErrorMessage>{touched.desc && errors.desc}</FormErrorMessage>
        </FormControl>
        <FormControl mt="5" isInvalid={Boolean(touched.body && errors.body)}>
          <Textarea
            rows="12"
            name="body"
            placeholder="Enter markdown here..."
            mb="3.5"
            {...getFieldProps('body')}
          />
          <FormErrorMessage>{touched.body && errors.body}</FormErrorMessage>
          <Box mt="7" display="flex" alignItems="center">
            <Link
              href="https://guides.github.com/features/mastering-markdown/"
              isExternal
            >
              Markdown is supported.{' '}
              <FiExternalLink
                size="1.2rem"
                style={{ display: 'inline-block', marginBottom: '-0.2rem' }}
              />
            </Link>
          </Box>
        </FormControl>
        <Flex justifyContent="flex-end">
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={loading}
            loadingText="Publishing...🚀"
          >
            Publish
          </Button>
        </Flex>
      </Form>
    </FormikProvider>
  );
}

export default PostForm;
