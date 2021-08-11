import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import {
  chakra,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

import DrawerLogin from "../pages/DrawerLogin";

function Header() {
  const bg = useColorModeValue("white", "gray.800");
  const { user, logout } = useContext(AuthContext);
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const text = useColorModeValue("dark", "light");

  const menuBar = user ? (
    <>
      <Button as={Link} to="/create-post" variant="ghost">
        Create Post
      </Button>
      <Button colorScheme="red" onClick={logout}>
        Log out
      </Button>
    </>
  ) : (
    <DrawerLogin />
  );

  return (
    <>
      <chakra.header
        pos="sticky"
        top="0"
        zIndex="3"
        bg={bg}
        left="0"
        right="0"
        width="full"
        shadow="sm"
      >
        <chakra.div height="4.5rem" mx="auto" maxW="8xl">
          <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
            <Flex alignItems="center" as={NavLink} to="/">
              <Heading fontSize={{ base: "1.3rem", lg: "1.7rem" }}>
                readmode
              </Heading>
            </Flex>
            <Spacer />
            <HStack spacing="3">
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{ base: "0", md: "3" }}
                onClick={toggleColorMode}
                icon={<SwitchIcon />}
              />
              {menuBar}
            </HStack>
          </Flex>
        </chakra.div>
      </chakra.header>
    </>
  );
}

export default Header;
