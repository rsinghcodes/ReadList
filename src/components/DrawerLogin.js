import React, { useState, useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Link,
  Text,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";

import Login from "./Login";
import Register from "./Register";

function DrawerLogin() {
  const [registerPage, setRegisterPage] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const bg = useColorModeValue("gray.50", "#011627");

  return (
    <>
      <Button
        colorScheme="teal"
        onClick={() => {
          onOpen();
          setRegisterPage(false);
        }}
      >
        Login
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />
          {registerPage ? (
            <DrawerHeader borderBottomWidth="1px">
              Create your account
            </DrawerHeader>
          ) : (
            <DrawerHeader borderBottomWidth="1px">
              Log in to your account
            </DrawerHeader>
          )}

          <DrawerBody>
            {registerPage ? (
              <Register onClose={onClose} />
            ) : (
              <Login onClose={onClose} />
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" justifyContent="center">
            {registerPage ? (
              <Text>
                Already registered?{" "}
                <Link onClick={() => setRegisterPage(!registerPage)}>
                  Login here!
                </Link>
              </Text>
            ) : (
              <Text>
                Not registered yet?{" "}
                <Link onClick={() => setRegisterPage(!registerPage)}>
                  Register here!
                </Link>
              </Text>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerLogin;
