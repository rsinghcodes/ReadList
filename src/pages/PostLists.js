import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Skeleton,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../utils/graphql';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';

const PostLists = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = data?.getPosts ?? [];
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
  const emptyStateBg = useColorModeValue('white', 'gray.800');

  return (
    <VStack spacing={4} mt="3" align="stretch">
      <Box py={4}>
        <Heading size="lg">Latest Posts</Heading>
        <Text color={mutedTextColor} mt={2}>
          Fresh ideas from the community, all in one place.
        </Text>
      </Box>
      {loading ? (
        <>
          <Skeleton h="220px" rounded="lg" />
          <Skeleton h="220px" rounded="lg" />
          <Skeleton h="220px" rounded="lg" />
        </>
      ) : posts.length > 0 ? (
        posts.map((post) => <PostCard post={post} key={post.id} />)
      ) : (
        <Box
          borderWidth="1px"
          rounded="lg"
          p={8}
          textAlign="center"
          bg={emptyStateBg}
        >
          <Heading size="md" mb={2}>
            No posts yet
          </Heading>
          <Text color={mutedTextColor} mb={6}>
            Be the first to share something worth reading.
          </Text>
          {user ? (
            <Button as={Link} to="/create-post" colorScheme="teal">
              Write the first post
            </Button>
          ) : (
            <Text color={mutedTextColor}>Sign in to create the first post.</Text>
          )}
        </Box>
      )}
    </VStack>
  );
};

export default PostLists;
