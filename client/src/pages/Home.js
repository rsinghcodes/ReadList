import React, { useContext } from "react";

import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../util/graphql";

import PostCard from "../components/PostCard";
import { Box, Center, Text, VStack } from "@chakra-ui/react";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <>
      <Box borderWidth="1px" borderRadius="md" overflow="hidden" my="5">
        <Center h="150px">
          {user ? (
            <Text fontSize="4xl" fontWeight="bold" textTransform="uppercase">
              Hi {user.username}, Welcome back!
            </Text>
          ) : (
            <Text fontSize="4xl" fontWeight="bold" textTransform="uppercase">
              Trending Blogs
            </Text>
          )}
        </Center>
      </Box>
      <VStack spacing={4}>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <>
            {data.getPosts &&
              data.getPosts.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
          </>
        )}
      </VStack>
    </>
  );
}

export default Home;
