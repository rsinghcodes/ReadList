import React, { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Td,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ManageUsers = ({ user }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelRef = useRef();

  const [deleteUserByAdmin] = useMutation(DELETE_USER_MUTATION, {
    update() {
      setConfirmOpen(false);
      window.location.reload(false);
    },
    variables: { userId: user.id },
  });

  return (
    <Tr>
      <Td>{user.fullname}</Td>
      <Td>{user.email}</Td>
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
                <Button colorScheme="red" onClick={deleteUserByAdmin} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Td>
    </Tr>
  );
};

const DELETE_USER_MUTATION = gql`
  mutation deleteUserByAdmin($userId: ID!) {
    deleteUserByAdmin(userId: $userId)
  }
`;

export default ManageUsers;
