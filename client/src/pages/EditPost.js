import { Heading } from "@chakra-ui/react";
import React from "react";

import PostForm from "../components/PostForm";

function EditPost() {
  return (
    <>
      <Heading fontSize="2xl" mt="5">
        Edit Post
      </Heading>
      <PostForm />
    </>
  );
}

export default EditPost;
