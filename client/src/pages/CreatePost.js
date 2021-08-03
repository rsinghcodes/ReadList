import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";

import PostForm from "../components/PostForm";

const CreatePost = () => {
  return (
    <>
      <Box borderWidth="1px" borderRadius="md" overflow="hidden" my="5">
        <Center h="150px">
          <Text fontSize="4xl" fontWeight="bold" textTransform="uppercase">
            Write something to publish.
          </Text>
        </Center>
      </Box>
      <PostForm />
    </>
  );
};

export default CreatePost;
