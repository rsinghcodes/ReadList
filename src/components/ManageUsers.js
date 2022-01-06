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
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";

const ManageUsers = ({
  user: { id, fullname, email, createdAt, updatedAt, access },
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelRef = useRef();
  const toast = useToast();

  const [deleteUserByAdmin] = useMutation(DELETE_USER_MUTATION, {
    update() {
      setConfirmOpen(false);
      window.location.reload(false);
    },
    variables: { userId: id },
  });

  const [accountPermission] = useMutation(ACCOUNT_ACCESS_MUTATION, {
    update() {
      toast({
        position: "top",
        description: "Access Changed",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  return (
    <Tr>
      <Td>{fullname}</Td>
      <Td>{email}</Td>
      <Td>{access.toString()}</Td>
      <Td>{moment(createdAt).fromNow()}</Td>
      <Td>{moment(updatedAt).fromNow()}</Td>
      <Td isNumeric>
        <Tooltip label="Grant account access">
          <IconButton
            aria-label="Grant account access"
            icon={<CheckCircleIcon />}
            mr={2}
            colorScheme="green"
            onClick={() =>
              accountPermission({
                variables: { userId: id, access: true },
              })
            }
          />
        </Tooltip>
        <Tooltip label="Revoke account access">
          <IconButton
            aria-label="Revoke account access"
            icon={<NotAllowedIcon />}
            colorScheme="red"
            mr={2}
            onClick={() =>
              accountPermission({
                variables: { userId: id, access: false },
              })
            }
          />
        </Tooltip>
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

const ACCOUNT_ACCESS_MUTATION = gql`
  mutation accountPermission($userId: ID!, $access: Boolean!) {
    accountPermission(userId: $userId, access: $access)
  }
`;

export default ManageUsers;
