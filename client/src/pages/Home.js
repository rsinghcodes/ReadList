import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import {
  Box,
  Button,
  chakra,
  Flex,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import Search from "../components/Search";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <>
      <Box as="section" pb="16">
        <Search />
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
              with community.
            </Box>
          </chakra.h1>

          <Text
            maxW="560px"
            mx="auto"
            color={useColorModeValue("gray.500", "gray.400")}
            fontSize={{ base: "lg", lg: "xl" }}
            mt="6"
          >
            ReadList is simple, and easy to use blogging application. Share
            anything with ease and at zero cost.
          </Text>
          {user && (
            <Flex mt="10" justify="center">
              <Button
                h="4rem"
                px="40px"
                fontSize="1.2rem"
                as={Link}
                to="/create-post"
                size="lg"
                colorScheme="teal"
                rightIcon={<EditIcon fontSize="0.8em" />}
              >
                Create New Post
              </Button>
            </Flex>
          )}
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
