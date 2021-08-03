import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { AiOutlineBook } from "react-icons/ai";

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

function MenuBar() {
  const bg = useColorModeValue("white", "gray.800");
  const { user, logout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

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
        transition="box-shadow 0.2s, background-color 0.2s"
        pos="sticky"
        top="0"
        zIndex="3"
        bg={bg}
        left="0"
        right="0"
        width="full"
        px="10"
        py="5"
      >
        <Flex mx="auto">
          <Flex alignItems="center" as={Link} to="/">
            <Heading size="lg">Readmode</Heading>
          </Flex>
          <Spacer />
          <HStack spacing="3">
            <IconButton
              aria-label="Toggle dark or light mode"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
            />
            {menuBar}
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
}

export default MenuBar;
