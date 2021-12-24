import { useContext } from "react";
import { BsPerson } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { ChevronDownIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";

export default function ProfileMenu() {
  const { user, logout } = useContext(AuthContext);
  const [isLargerThan48em] = useMediaQuery("(min-width: 48em)");

  return (
    <Menu>
      {isLargerThan48em ? (
        <MenuButton
          as={Button}
          aria-label="Options"
          leftIcon={<BsPerson fontSize="1.3rem" />}
          rightIcon={<ChevronDownIcon />}
        >
          {user.fullname}
        </MenuButton>
      ) : (
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<BsPerson fontSize="1.3rem" />}
        />
      )}

      {/* -------------------- Mobile User Menu------------------ */}

      {user ? (
        <MenuList>
          <MenuItem display={{ base: "flex", md: "none" }}>
            {user.fullname}
          </MenuItem>
          <MenuDivider display={{ base: "flex", md: "none" }} />
          <MenuItem icon={<ViewIcon />} as={Link} to="/profile">
            View Profile
          </MenuItem>
          <MenuItem icon={<EditIcon />} as={Link} to="/create-post">
            Create post
          </MenuItem>
          <MenuItem icon={<FiLogOut />} onClick={logout}>
            Log Out
          </MenuItem>
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
