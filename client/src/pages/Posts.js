import React, { useContext } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";

import {
  Box,
  Button,
  Center,
  chakra,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import { EditIcon, SearchIcon } from "@chakra-ui/icons";

function Posts() {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = React.useState("");

  const { loading, data } = useQuery(FETCH_USERS_POSTS_QUERY, {
    variables: {
      userId: user.id,
    },
  });

  const [searchPost, spost] = useLazyQuery(FETCH_SEARCHED_POSTS_QUERY);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      searchPost({
        variables: {
          filter: query,
        },
      });
    }
  };

  return (
    <>
      <Flex pos="relative" align="stretch" mt={6} mb={8}>
        <chakra.input
          aria-autocomplete="list"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          rounded="lg"
          maxLength={64}
          sx={{
            w: "100%",
            h: "68px",
            pl: "68px",
            fontWeight: "medium",
            outline: 0,
            bg: "gray.100",
            ".chakra-ui-dark &": { bg: "gray.700" },
          }}
          placeholder="Search the blog"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={onKeyDown}
        />
        <Center pos="absolute" left={7} h="68px">
          <SearchIcon color="teal.500" boxSize="20px" />
        </Center>
      </Flex>

      <VStack spacing={4} mt={3}>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <>
            {data.getUserPosts &&
              data.getUserPosts.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            {data.getUserPosts.length === 0 && (
              <Box
                as="article"
                p="5"
                my={7}
                borderWidth="1px"
                rounded="lg"
                w="100%"
              >
                <Heading size="md" textAlign="center">
                  No Posts Found!
                </Heading>
                <Flex mt="10" justify="center">
                  <Button
                    as={Link}
                    to="/create-post"
                    size="md"
                    colorScheme="teal"
                    rightIcon={<EditIcon fontSize="1em" />}
                  >
                    Create New Post
                  </Button>
                </Flex>
              </Box>
            )}
          </>
        )}
      </VStack>
    </>
  );
}

const FETCH_USERS_POSTS_QUERY = gql`
  query ($userId: ID!) {
    getUserPosts(userId: $userId) {
      id
      title
      desc
      sanitizedHtml
      createdAt
      slug
    }
  }
`;

const FETCH_SEARCHED_POSTS_QUERY = gql`
  query ($filter: String) {
    searchPost(filter: $filter) {
      id
      title
      desc
      sanitizedHtml
      createdAt
      slug
    }
  }
`;

export default Posts;
