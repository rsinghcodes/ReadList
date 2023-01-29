import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { EditIcon } from '@chakra-ui/icons';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import Search from '../components/Search';

import { FETCH_USERS_POSTS_QUERY } from '../utils/graphql';

function UserPosts() {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_USERS_POSTS_QUERY, {
    variables: {
      userId: user.id,
    },
  });

  return (
    <>
      <Search />
      <VStack spacing={4} mt="8">
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <>
            {data?.getUserPosts.map((post) => (
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

export default UserPosts;
