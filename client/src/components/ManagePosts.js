import React, { useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { DeleteIcon } from "@chakra-ui/icons";

const ManagePosts = ({ post }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelRef = useRef();

  const [deletePostByAdmin] = useMutation(DELETE_POST_MUTATION, {
    update() {
      setConfirmOpen(false);
      window.location.reload(false);
    },
    variables: { postId: post.id },
  });

  return (
    <>
      <Tr>
        <Td>{post.title}</Td>
        <Td>{post.desc}</Td>
        <Td>{post.fullname}</Td>
        <Td isNumeric>
          <IconButton
            aria-label="Delete post"
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => setConfirmOpen(true)}
          />

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
