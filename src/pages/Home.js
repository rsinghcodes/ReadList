import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

import { AuthContext } from '../context/auth';
import Search from '../components/Search';
import PostLists from './PostLists';

function Home() {
  const { user } = useContext(AuthContext);
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <>
      <Search />
      <Box as="section" pt={{ base: '12', md: '20' }}>
        <Box textAlign="center">
          <chakra.h1
            maxW="16ch"
            mx="auto"
            fontSize={{ base: '2.25rem', sm: '3rem', lg: '4rem' }}
            fontFamily="heading"
            letterSpacing="tighter"
            fontWeight="extrabold"
            mb="16px"
            lineHeight="1.2"
          >
            Publish stories and share
            <Box as="span" color={useColorModeValue('teal.500', 'teal.300')}>
              {' '}
              with your community.
            </Box>
          </chakra.h1>

          <Text
            maxW="560px"
            mx="auto"
            color={mutedTextColor}
            fontSize={{ base: 'lg', lg: 'xl' }}
            mt="6"
          >
            Discover thoughtful posts, search quickly, and start writing when
            inspiration strikes.
          </Text>

          <Flex my="10" justify="center">
            <HStack spacing={4} flexWrap="wrap" justify="center">
              <Button
                h="4rem"
                px="32px"
                fontSize="1.1rem"
                as={Link}
                to="/posts"
                size="lg"
                variant="outline"
                colorScheme="teal"
              >
                Explore Posts
              </Button>
              {user && (
                <Button
                  h="4rem"
                  px="40px"
                  fontSize="1.1rem"
                  as={Link}
                  to="/create-post"
                  size="lg"
                  colorScheme="teal"
                  rightIcon={<EditIcon fontSize="0.8em" />}
                >
                  Create New Post
                </Button>
              )}
            </HStack>
          </Flex>
          {!user && (
            <Text color={mutedTextColor} mb="8">
              Sign in from the top-right menu to publish your own articles.
            </Text>
          )}
        </Box>
      </Box>
      <Box id="latest-posts">
        <PostLists />
      </Box>
    </>
  );
}

export default Home;
