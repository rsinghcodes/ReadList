import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box as="footer" mt={12} textAlign="center" borderTopWidth="1px" py="7">
      <Text fontSize="sm">Proudly created by Raghvendra Singh.</Text>
    </Box>
  );
};

export default Footer;
