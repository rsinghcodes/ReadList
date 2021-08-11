import React, { useContext } from "react";

import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../util/graphql";

import PostCard from "../components/PostCard";
import { Box, chakra, Text, useColorModeValue, VStack } from "@chakra-ui/react";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <>
      <Box as="section" py="6rem">
        <Box textAlign="center">
          <chakra.h1
            maxW="16ch"
            mx="auto"
            fontSize={{ base: "2.25rem", sm: "3rem", lg: "4rem" }}
            fontFamily="heading"
            letterSpacing="tighter"
            fontWeight="extrabold"
            mb="16px"
            lineHeight="1.2"
          >
            Create blog and share
            <Box as="span" color={useColorModeValue("teal.500", "teal.300")}>
              {" "}
              with speed
            </Box>
          </chakra.h1>

          <Text
            maxW="560px"
            mx="auto"
            color={useColorModeValue("gray.500", "gray.400")}
            fontSize={{ base: "lg", lg: "xl" }}
            mt="6"
          >
            Readmode is simple, and easy to use blogging application. Share
            anything with ease and no cost.
          </Text>
        </Box>
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
