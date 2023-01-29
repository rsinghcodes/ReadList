import React, { useState, useRef } from 'react';
import { gql, useMutation } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../utils/graphql';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  MenuItem,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { toast } from 'react-hot-toast';

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelRef = useRef();
  const toastText = commentId ? 'Comment' : 'Post';

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(client, { data }) {
      setConfirmOpen(false);
      if (!commentId) {
        const { getPosts } = client.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        client.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: getPosts.filter((post) => post.id !== data.deletePost.id),
          },
        });
      }
    },
    onCompleted() {
      if (callback) callback();
      toast.success(`${toastText} deleted successfully.`, {
        duration: 2500,
      });
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      {commentId ? (
        <IconButton
          aria-label="Delete comment"
          icon={<DeleteIcon />}
          colorScheme="red"
          onClick={() => setConfirmOpen(true)}
        />
      ) : (
        <MenuItem
          aria-label="Delete post"
          icon={<DeleteIcon />}
          onClick={() => setConfirmOpen(true)}
        >
          Delete Post
        </MenuItem>
      )}
      <AlertDialog
        isOpen={confirmOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setConfirmOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {commentId ? 'Comment' : 'Post'}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setConfirmOpen(false)}>
                No
              </Button>
              <Button colorScheme="red" onClick={deletePostOrMutation} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        email
        fullname
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
