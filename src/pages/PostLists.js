import React from 'react';
import { VStack } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../utils/graphql';
import PostCard from '../components/PostCard';

const PostLists = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <>
      <VStack spacing={4} mt="3">
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
};

export default PostLists;
