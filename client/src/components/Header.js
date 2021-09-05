import React, { useContext, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  chakra,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useViewportScroll } from "framer-motion";

import { AuthContext } from "../context/auth";

import ProfileMenu from "./ProfileMenu";
import DrawerLogin from "./DrawerLogin";

function Header() {
  const { user } = useContext(AuthContext);

  const bg = useColorModeValue("white", "gray.800");
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const text = useColorModeValue("dark", "light");

  // -------- for header shadow -------------------

  const ref = useRef();
  const [y, setY] = useState(0);
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  //--------- header shadow end --------------------

  const menuBar = user ? <ProfileMenu /> : <DrawerLogin />;

  return (
    <>
      <chakra.header
        ref={ref}
        shadow={y > height ? "sm" : undefined}
        transition="box-shadow 0.2s, background-color 0.2s"
        pos="sticky"
        top="0"
        zIndex="3"
        bg={bg}
        left="0"
        right="0"
        width="full"
      >
        <chakra.div height="4.5rem" mx="auto" maxW="8xl">
          <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
            <Flex alignItems="center" as={NavLink} to="/">
              <Heading fontSize={{ base: "1.3rem", lg: "1.7rem" }}>
                read
                <Box
                  as="span"
                  color={useColorModeValue("teal.500", "teal.300")}
                >
                  list
                </Box>
              </Heading>
            </Flex>
            <Spacer />
            <Flex justify="flex-end" align="center">
              <Tooltip hasArrow label={`Switch to ${text} mode`} fontSize="sm">
                <IconButton
                  size="md"
                  fontSize="lg"
                  aria-label={`Switch to ${text} mode`}
                  variant="ghost"
                  color="current"
                  mr="3"
                  onClick={toggleColorMode}
                  icon={<SwitchIcon />}
                />
              </Tooltip>
              {menuBar}
            </Flex>
          </Flex>
        </chakra.div>
      </chakra.header>
    </>
  );
}

export default Header;
