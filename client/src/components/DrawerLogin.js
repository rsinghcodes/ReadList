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
} from "@chakra-ui/react";

import Login from "./Login";
import Register from "./Register";

function DrawerLogin() {
  const [registerPage, setRegisterPage] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

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
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {registerPage ? (
            <DrawerHeader borderBottomWidth="1px">
              Create your account
            </DrawerHeader>
          ) : (
            <DrawerHeader borderBottomWidth="1px">
              Login to your account
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
