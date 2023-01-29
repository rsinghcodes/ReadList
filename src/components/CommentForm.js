import React, { useState, useRef } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';

function CommentForm({ postId }) {
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });
  return (
    <>
      <Box mt="5">
        <Input
          placeholder="Comment on this post.."
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          ref={commentInputRef}
        />
      </Box>

      <Button
        mt="3.5"
        onClick={submitComment}
        colorScheme="teal"
        isDisabled={comment.trim() === ''}
      >
        Publish Comment
      </Button>
    </>
  );
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        email
        fullname
      }
      commentCount
    }
  }
`;

export default CommentForm;
