import React from "react";
import { Link } from "react-router-dom";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <>
      <VStack
        justify="center"
        spacing="4"
        as="section"
        py={{ base: "12rem", lg: "10rem" }}
        textAlign="center"
      >
        <Heading>404 | Page Not Found</Heading>
        <Text fontSize={{ md: "xl" }}>
          You just hit a route that doesn&#39;t exist... the sadness.😢
        </Text>
        <Link to="/">
          <Button
            as="a"
            aria-label="Back to Home"
            leftIcon={<FaHome />}
            colorScheme="teal"
            size="lg"
          >
            Back to Home
          </Button>
        </Link>
      </VStack>
    </>
  );
};

export default NotFoundPage;
