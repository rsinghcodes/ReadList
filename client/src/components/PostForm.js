import React from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Input,
  Textarea,
  Link,
  Flex,
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

import { Form } from "../util/useForm";

function PostForm({ values, onChange, onSubmit, errors }) {
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
        <Box mt="5">
          <Textarea
            rows="12"
            name="body"
            value={values.body}
            placeholder="Enter markdown here..."
            onChange={onChange}
            mb="3.5"
          />
          <Link
            href="https://guides.github.com/features/mastering-markdown/"
            isExternal
          >
            Markdown is supported.{" "}
            <FiExternalLink style={{ display: "inline-block" }} />
          </Link>
        </Box>
        <Flex justifyContent="flex-end">
          <Button type="submit" colorScheme="teal">
            Publish
          </Button>
        </Flex>
        {/* ---------------- Error handling ------------------ */}

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

export default PostForm;
