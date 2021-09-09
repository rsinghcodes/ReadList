import { Heading } from "@chakra-ui/react";
import React from "react";

import PostForm from "../components/PostForm";

const CreatePost = () => {
  return (
    <>
      <Heading fontSize="2xl" mt="5">
        Create Post
      </Heading>
      <PostForm />
    </>
  );
};

export default CreatePost;
