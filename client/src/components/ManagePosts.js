import React, { useRef, useState } from "react";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { DeleteIcon } from "@chakra-ui/icons";

import { FETCH_POSTS_QUERY } from "../util/graphql";

const ManagePosts = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelRef = useRef();
  const toast = useToast();

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update() {
      setConfirmOpen(false);
      toast({
        position: "top",
        description: `Your Post has been successfully deleted.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  return (
    <>
      {loading ? (
        <h1>Loading posts...</h1>
      ) : (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.getPosts &&
                data.getPosts.map((post) => (
                  <Tr key={post.id}>
                    <Td>{post.title}</Td>
                    <Td>{post.desc}</Td>
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
                              Are you sure? You can't undo this action
                              afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button
                                ref={cancelRef}
                                onClick={() => setConfirmOpen(false)}
                              >
                                No
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  deletePost({
                                    variables: {
                                      postId: post.id,
                                    },
                                  });
                                }}
                                ml={3}
                              >
                                Yes
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </>
      )}
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default ManagePosts;
