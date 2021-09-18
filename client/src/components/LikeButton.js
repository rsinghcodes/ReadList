import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { IoMdThumbsUp } from "react-icons/io";
import { Box, IconButton, Tag, TagLabel, Tooltip } from "@chakra-ui/react";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  const tooltipText = liked ? "Unlike" : "Like";

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user && (
    <Tooltip hasArrow label={`${tooltipText} this post`} fontSize="sm">
      {liked ? (
        <IconButton
          colorScheme="teal"
          aria-label="Like post"
          icon={<IoMdThumbsUp size="1.5rem" />}
          onClick={likePost}
        />
      ) : (
        <IconButton
          aria-label="Like post"
          icon={<IoMdThumbsUp size="1.5rem" />}
          onClick={likePost}
        />
      )}
    </Tooltip>
  );

  return (
    <Box display="flex" alignItems="center">
      <Tag size="lg" variant="subtle" colorScheme="gray" mr="4">
        <TagLabel>{likeCount} Likes</TagLabel>
      </Tag>{" "}
      {likeButton}
    </Box>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
