import {
  Box,
  Divider,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";

import ManagePosts from "../../components/ManagePosts";
import ManageUsers from "../../components/ManageUsers";

const AdminDashboard = () => {
  return (
    <Box>
      <Heading as="h4" size="md" mt={4}>
        Dashboard
      </Heading>
      <Divider orientation="horizontal" my={4} />
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Manage Posts</Tab>
          <Tab>Manage Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ManagePosts />
          </TabPanel>
          <TabPanel>
            <ManageUsers />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminDashboard;
