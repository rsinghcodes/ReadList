import React, { useContext, useRef, useState } from 'react';
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
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import moment from 'moment';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../context/auth';
import { FETCH_ADMINS_QUERY } from '../utils/graphql';

const ManageAdmins = ({ admin }) => {
  const { user } = useContext(AuthContext);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelRef = useRef();

  const [deleteAdmin] = useMutation(DELETE_ADMIN_MUTATION, {
    update(client) {
      setConfirmOpen(false);
      const { getAdmins } = client.readQuery({
        query: FETCH_ADMINS_QUERY,
      });
      client.writeQuery({
        query: FETCH_ADMINS_QUERY,
        data: {
          getAdmins: getAdmins.filter((a) => a.id !== admin.id),
        },
      });
    },
    onCompleted() {
      toast.success('Admin deleted successfully.', {
        duration: 2500,
      });
    },
    variables: { adminId: admin.id },
  });

  return (
    <Tr>
      <Td>{admin.fullname}</Td>
      <Td>{admin.email}</Td>
      <Td>{moment(admin.createdAt).fromNow()}</Td>
      {user.id !== admin.id && (
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
                  <Button colorScheme="red" onClick={deleteAdmin} ml={3}>
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Td>
      )}
    </Tr>
  );
};

const DELETE_ADMIN_MUTATION = gql`
  mutation deleteAdmin($adminId: ID!) {
    deleteAdmin(adminId: $adminId)
  }
`;

export default ManageAdmins;
