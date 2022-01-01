import React from "react";
import {
  FormControl,
  Button,
  Input,
  Textarea,
  Link,
  Flex,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

import { Form } from "../util/useForm";

function PostForm({ values, onChange, onSubmit, errors }) {
  return (
    <>
      <Form onSubmit={onSubmit}>
        <FormControl mt="5" isInvalid={errors.title ? true : false}>
          <Input
            placeholder="Write title here..."
            name="title"
            value={values.title}
            onChange={onChange}
          />
          {errors.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
        </FormControl>
        <FormControl my="5" isInvalid={errors.desc ? true : false}>
          <Input
            placeholder="Write description here..."
            name="desc"
            value={values.desc}
            onChange={onChange}
          />
          {errors.desc && <FormErrorMessage>{errors.desc}</FormErrorMessage>}
        </FormControl>
        <FormControl mt="5" isInvalid={errors.body ? true : false}>
          <Textarea
            rows="12"
            name="body"
            value={values.body}
            placeholder="Enter markdown here..."
            onChange={onChange}
            mb="3.5"
          />
          {errors.body && <FormErrorMessage>{errors.body}</FormErrorMessage>}
          <Box mt="7" display="flex" alignItems="center">
            <Link
              href="https://guides.github.com/features/mastering-markdown/"
              isExternal
            >
              Markdown is supported.{" "}
              <FiExternalLink
                size="1.2rem"
                style={{ display: "inline-block", marginBottom: "-0.2rem" }}
              />
            </Link>
          </Box>
        </FormControl>
        <Flex justifyContent="flex-end">
          <Button type="submit" colorScheme="teal">
            Publish
          </Button>
        </Flex>
      </Form>
    </>
  );
}

export default PostForm;
