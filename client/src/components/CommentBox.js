import React, { useContext } from "react";
import moment from "moment";
import { Avatar, Box, Text, useColorModeValue } from "@chakra-ui/react";

import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";

function CommentBox({ postId, comment }) {
  const { user } = useContext(AuthContext);

  return (
    <Box
      key={comment.id}
      display="flex"
      justifyContent="space-between"
      rounded="lg"
      p="5"
      mt="4"
      mb="2"
      bg={useColorModeValue("gray.100", "gray.700")}
    >
      <Box display="flex">
        <Avatar mr="16px" size="sm" loading="lazy" />
        <Box fontSize="sm">
          <p>
            {comment.fullname}{" "}
            <Box as="span" opacity={0.7}>
              · {moment(comment.createdAt).fromNow()}
            </Box>
          </p>

          <Text fontSize={{ base: "md", md: "lg" }} mt="2">
            {comment.body}
          </Text>
        </Box>
      </Box>
      {user && user.email === comment.email && (
        <DeleteButton postId={postId} commentId={comment.id} />
      )}
    </Box>
  );
}

export default CommentBox;
