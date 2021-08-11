import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, IconButton, Text } from "@chakra-ui/react";
import { BiHeart } from "react-icons/bi";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <IconButton aria-label="Like Icon" icon={<BiHeart type="solid" />} />
    ) : (
      <IconButton aria-label="Like Icon" icon={<BiHeart />} />
    )
  ) : (
    <IconButton
      as={Link}
      to="/login"
      aria-label="Like Icons"
      icon={<BiHeart type="solid" />}
    />
  );

  return (
    <Button onClick={likePost}>
      {likeButton}
      <Text>{likeCount}</Text>
    </Button>
  );
};

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
