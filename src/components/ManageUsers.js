import React, { useRef, useState } from 'react';
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
} from '@chakra-ui/react';
import { CheckCircleIcon, DeleteIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { gql, useMutation } from '@apollo/client';
import moment from 'moment';
import toast from 'react-hot-toast';

import { FETCH_USERS_QUERY } from '../utils/graphql';

const ManageUsers = ({
  user: { id, fullname, email, createdAt, updatedAt, access },
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelRef = useRef();

  const [deleteUserByAdmin] = useMutation(DELETE_USER_MUTATION, {
    variables: { userId: id },
    update(client) {
      setConfirmOpen(false);
      const data = client.readQuery({
        query: FETCH_USERS_QUERY,
      });
      client.writeQuery({
        query: FETCH_USERS_QUERY,
        data: {
          getUsers: data.getUsers.filter((user) => user.id !== id),
        },
      });
      toast.success('User deleted successfully.', {
        position: 'top-center',
        duration: 2500,
      });
    },
    onError(err) {
      toast.error('Something went wrong!', {
        position: 'top-center',
        duration: 2500,
      });
    },
  });

  const [accountPermission] = useMutation(ACCOUNT_ACCESS_MUTATION, {
    update(client, result) {
      const data = client.readQuery({
        query: FETCH_USERS_QUERY,
      });
      client.writeQuery({
        query: FETCH_USERS_QUERY,
        data: {
          getUsers: data.getUsers.map((user) =>
            user.id === id ? result?.data?.accountPermission : user
          ),
        },
      });
      toast.success('Access changed successfully.', {
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
    <Tr>
      <Td>{fullname}</Td>
      <Td>{email}</Td>
      <Td>{access ? 'Yes' : 'No'}</Td>
      <Td>{moment(createdAt).fromNow()}</Td>
      <Td>{moment(updatedAt).fromNow()}</Td>
      <Td isNumeric>
        {access ? (
          <Tooltip label="Revoke account access">
            <IconButton
              aria-label="Revoke account access"
              icon={<NotAllowedIcon />}
              colorScheme="red"
              mr={2}
              onClick={() =>
                accountPermission({
                  variables: { userId: id, access: !access },
                })
              }
            />
          </Tooltip>
        ) : (
          <Tooltip label="Grant account access">
            <IconButton
              aria-label="Grant account access"
              icon={<CheckCircleIcon />}
              mr={2}
              colorScheme="green"
              onClick={() =>
                accountPermission({
                  variables: { userId: id, access: !access },
                })
              }
            />
          </Tooltip>
        )}

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
    accountPermission(userId: $userId, access: $access) {
      id
      fullname
      email
      createdAt
      updatedAt
      access
    }
  }
`;

export default ManageUsers;
