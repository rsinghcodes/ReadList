import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Heading,
  StackDivider,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useContext, useRef, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const Profile = () => {
  const context = useContext(AuthContext);
  const userId = context.user.id;
  const toast = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelRef = useRef();

  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId,
    },
  });

  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    update() {
      context.logout();
      toast({
        position: 'top',
        description: `Your Account has been successfully deleted.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    variables: { userId },
  });

  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" mt="5" p="3.5">
        <Heading fontSize="2xl">Personal Information</Heading>{' '}
        {data ? (
          <>
            <VStack
              my="7"
              divider={<StackDivider />}
              spacing={4}
              align="stretch"
            >
              <Text fontSize="md">Full Name: {data.getUser.fullname}</Text>
              <Text fontSize="md">Email: {data.getUser.email}</Text>
            </VStack>
            <Divider orientation="horizontal" />
            <Box mt="7" display="flex" justifyContent="flex-end">
              <Button colorScheme="red" onClick={() => setConfirmOpen(true)}>
                Delete my account
              </Button>
              <Button colorScheme="teal" ml="7" as={Link} to="/profile/update">
                Update Profile
              </Button>
            </Box>
          </>
        ) : (
          <>
            <VStack
              my="7"
              divider={<StackDivider />}
              spacing={4}
              align="stretch"
            >
              <Text fontSize="lg">Data Loading... </Text>
            </VStack>
          </>
        )}
      </Box>
      <AlertDialog
        isOpen={confirmOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setConfirmOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards. All your
              account details and posts will be deleted.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setConfirmOpen(false)}>
                No
              </Button>
              <Button colorScheme="red" onClick={deleteUser} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const FETCH_USER_QUERY = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      fullname
      email
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

export default Profile;
