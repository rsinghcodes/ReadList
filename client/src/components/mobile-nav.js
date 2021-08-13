import { useContext } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

export function MobileNavContent() {
  const { user, logout } = useContext(AuthContext);
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
        display={{ base: "flex", md: "none" }}
      />
      {user ? (
        <MenuList>
          <MenuItem as={Link} to="/create-post">
            Create post
          </MenuItem>
          <MenuItem onClick={logout}>Log Out</MenuItem>
        </MenuList>
      ) : (
        <MenuList>
          <MenuItem as={Link} to="/login">
            Login
          </MenuItem>
          <MenuItem as={Link} to="/register">
            Register
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
}
