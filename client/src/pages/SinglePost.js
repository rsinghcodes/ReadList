import React, { useContext } from "react";
import { BiShareAlt } from "react-icons/bi";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { AuthContext } from "../context/auth";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tag,
  TagLabel,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import DeleteButton from "../components/DeleteButton";
import CommentForm from "../components/CommentForm";
import { Link } from "react-router-dom";

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (!data) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      title,
      desc,
      sanitizedHtml,
      createdAt,
      fullname,
      username,
      comments,
      // likes,
      likeCount,
      commentCount,
    } = data.getPost;

    postMarkup = (
      <>
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
          <Flex my="3" alignItems="center" justifyContent="space-between">
            <Text color="gray.500">
              Published by: {fullname} · {moment(createdAt).fromNow()}
            </Text>
            {user && user.username === username && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<ChevronDownIcon fontSize="2xl" />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem icon={<BiShareAlt />}>Share Post</MenuItem>
                  <MenuItem icon={<EditIcon />} as={Link} to="/edit/:postId">
                    Edit Post
                  </MenuItem>
                  <DeleteButton postId={id} callback={deletePostCallback} />
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Divider marginBottom="3.5" />
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        </Box>

        <Box mt="7">
          {user && <CommentForm postId={id} />}
          <Divider my="3" />
          <HStack spacing="1rem">
            <Tag size="lg" variant="subtle" colorScheme="blue">
              <TagLabel>{commentCount} Comments</TagLabel>
            </Tag>{" "}
            <Tag size="lg" variant="subtle" colorScheme="blue">
              <TagLabel>{likeCount} Likes</TagLabel>
            </Tag>
          </HStack>

          {comments.map((comment) => (
            <Box
              key={comment.id}
              display="flex"
              justifyContent="space-between"
              rounded="lg"
              p="5"
              mt="4"
              mb="2"
              // bg={useColorModeValue("white", "gray.700")}
              bg={"gray.700"}
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
              {user && user.username === comment.username && (
                <DeleteButton postId={id} commentId={comment.id} />
              )}
            </Box>
          ))}
        </Box>
      </>
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
      sanitizedHtml
      createdAt
      fullname
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        fullname
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
