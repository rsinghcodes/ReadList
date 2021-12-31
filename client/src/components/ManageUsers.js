import React from "react";
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const ManageUsers = () => {
  return (
    <Table variant="simple">
      <TableCaption>Manage Users</TableCaption>
      <Thead>
        <Tr>
          <Th>Full Name</Th>
          <Th>Email</Th>
          <Th isNumeric>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>inches</Td>
          <Td>millimetres (mm)</Td>
          <Td isNumeric>25.4</Td>
        </Tr>
        <Tr>
          <Td>feet</Td>
          <Td>centimetres (cm)</Td>
          <Td isNumeric>30.48</Td>
        </Tr>
        <Tr>
          <Td>yards</Td>
          <Td>metres (m)</Td>
          <Td isNumeric>0.91444</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Full Name</Th>
          <Th>Email</Th>
          <Th isNumeric>Action</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

export default ManageUsers;
