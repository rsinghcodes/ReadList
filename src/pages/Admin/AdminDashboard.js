import { useQuery } from '@apollo/client';
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
} from '@chakra-ui/react';
import React, { lazy } from 'react';
import ManageAdmins from '../../components/ManageAdmins';

import {
  FETCH_POSTS_QUERY,
  FETCH_USERS_QUERY,
  FETCH_ADMINS_QUERY,
} from '../../utils/graphql';
const ManagePosts = lazy(() => import('../../components/ManagePosts'));
const ManageUsers = lazy(() => import('../../components/ManageUsers'));
const AdminRegister = lazy(() => import('../../components/AdminRegister'));

const AdminDashboard = () => {
  const posts = useQuery(FETCH_POSTS_QUERY);
  const users = useQuery(FETCH_USERS_QUERY);
  const admins = useQuery(FETCH_ADMINS_QUERY);

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
          <Tab>Manage Admins</Tab>
          <Tab>Create New Admin</Tab>
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
              <p>Loading users...</p>
            ) : (
              <Table>
                <Thead>
                  <Tr>
                    <Th>FullName</Th>
                    <Th>Email</Th>
                    <Th>Access</Th>
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
          <TabPanel>
            {admins.loading ? (
              <p>Loading admins...</p>
            ) : (
              <Table>
                <Thead>
                  <Tr>
                    <Th>FullName</Th>
                    <Th>Email</Th>
                    <Th>Account Created</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {admins.data.getAdmins &&
                    admins.data.getAdmins.map((admin) => (
                      <ManageAdmins admin={admin} key={admin.id} />
                    ))}
                </Tbody>
              </Table>
            )}
          </TabPanel>
          <TabPanel>
            <AdminRegister />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminDashboard;
