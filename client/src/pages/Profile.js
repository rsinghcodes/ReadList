import {
  Box,
  Button,
  Divider,
  Heading,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

const Profile = () => {
  const context = useContext(AuthContext);
  const userId = context.user.id;
  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId,
    },
  });

  return (
    <Box borderWidth="1px" borderRadius="lg" mt="5" p="3.5">
      <Heading fontSize="2xl">Personal Information</Heading>{" "}
      {data ? (
        <>
          <VStack my="7" divider={<StackDivider />} spacing={4} align="stretch">
            <Text fontSize="md">Full Name: {data.getUser.fullname}</Text>
            <Text fontSize="md">Email: {data.getUser.email}</Text>
          </VStack>
          <Divider orientation="horizontal" />
          <Box mt="7" display="flex" justifyContent="flex-end">
            <Button
              colorScheme="red"
              // isLoading={loading}
              // loadingText="Deleting..."
            >
              Delete my account
            </Button>{" "}
            <Button colorScheme="teal" ml="7" as={Link} to="/profile/update">
              Update Profile
            </Button>
          </Box>
        </>
      ) : (
        <>
          <VStack my="7" divider={<StackDivider />} spacing={4} align="stretch">
            <Text fontSize="lg">Data Loading... </Text>
          </VStack>
        </>
      )}
    </Box>
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

export default Profile;
