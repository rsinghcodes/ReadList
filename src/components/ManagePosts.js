import React, { useRef, useState } from 'react';
import {
  Td,
  Tr,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Flex,
  Link,
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import moment from 'moment';
import toast from 'react-hot-toast';

import { FETCH_POSTS_QUERY } from '../utils/graphql';

const ManagePosts = ({ post }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelRef = useRef();

  const [deletePostByAdmin] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId: post.id },
    update(client) {
      setConfirmOpen(false);
      const data = client.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      client.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: data.getPosts.filter((p) => p.id !== post.id),
        },
      });
      toast.success('Post deleted successfully.', {
        position: 'top-center',
        duration: 2500,
      });
    },
    onError(err) {
      if (err.graphQLErrors[0].extensions.code === 'AUTHENTICATION_ERROR') {
        toast.error('Action not allowed', {
          position: 'top-center',
          duration: 2500,
        });
      } else {
        toast.error('Something went wrong!', {
          position: 'top-center',
          duration: 2500,
        });
      }
    },
  });

  return (
    <>
      <Tr>
        <Td>{post.title}</Td>
        <Td>{post.desc}</Td>
        <Td>{post.fullname}</Td>
        <Td>{moment(post.createdAt).fromNow()}</Td>
        <Td>
          <Flex>
            <Link href={`/posts/${post.slug}`} isExternal>
              <IconButton
                aria-label="Visit Post"
                icon={<ExternalLinkIcon />}
                colorScheme="teal"
              />
            </Link>
            <IconButton
              aria-label="Delete post"
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => setConfirmOpen(true)}
              ml={2}
            />
          </Flex>
          <AlertDialog
            isOpen={confirmOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => setConfirmOpen(false)}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Post
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={() => setConfirmOpen(false)}>
                    No
                  </Button>
                  <Button colorScheme="red" onClick={deletePostByAdmin} ml={3}>
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Td>
      </Tr>
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePostByAdmin($postId: ID!) {
    deletePostByAdmin(postId: $postId)
  }
`;

export default ManagePosts;
