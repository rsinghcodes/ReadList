import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";

import { AuthContext } from "../context/auth";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");

  const {
    data: { getPost },
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  console.log(getPost);

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      title,
      desc,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Box marginTop={{ base: "3.5", md: "7" }}>
        <Heading
          fontSize={{ base: "3xl", md: "4xl" }}
          letterSpacing="tight"
          marginBottom="3.5"
        >
          {title}
        </Heading>
        <Text
          color="gray.500"
          fontSize={{ base: "xl", md: "2xl" }}
          marginBottom="3.5"
        >
          {desc}
        </Text>
        <Divider />
        <Flex my="3">
          <Text color="gray.500">
            Published by: {username} / {moment(createdAt).fromNow()}
          </Text>
        </Flex>
        <Divider marginBottom="3.5" />
        <Text
          fontSize={{ base: "md", md: "xl" }}
          fontWeight="normal"
          letterSpacing="wide"
        >
          {body}
        </Text>
      </Box>
    );
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      desc
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default SinglePost;
