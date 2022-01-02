import { useQuery } from "@apollo/react-hooks";
import {
  Box,
  Divider,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

import ManagePosts from "../../components/ManagePosts";
import ManageUsers from "../../components/ManageUsers";
import { FETCH_POSTS_QUERY, FETCH_USERS_QUERY } from "../../util/graphql";

const AdminDashboard = () => {
  const posts = useQuery(FETCH_POSTS_QUERY);
  const users = useQuery(FETCH_USERS_QUERY);

  return (
    <Box>
      <Heading as="h4" size="md" mt={4}>
        Admin Dashboard
      </Heading>
      <Divider orientation="horizontal" my={4} />
      <Tabs>
        <TabList>
          <Tab>Manage Posts</Tab>
          <Tab>Manage Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {posts.loading ? (
              <p>Loading posts...</p>
            ) : (
              <Table>
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th>Posted By</Th>
                    <Th>Published</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {posts.data.getPosts &&
                    posts.data.getPosts.map((post) => (
                      <ManagePosts post={post} key={post.id} />
                    ))}
                </Tbody>
              </Table>
            )}
          </TabPanel>
          <TabPanel>
            {users.loading ? (
              <p>Loading posts...</p>
            ) : (
              <Table>
                <Thead>
                  <Tr>
                    <Th>FullName</Th>
                    <Th>Email</Th>
                    <Th>Account Created</Th>
                    <Th>Account Updated</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.data.getUsers &&
                    users.data.getUsers.map((user) => (
                      <ManageUsers user={user} key={user.id} />
                    ))}
                </Tbody>
              </Table>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminDashboard;
