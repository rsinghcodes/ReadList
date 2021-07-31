import React, { useContext } from "react";
import StyledLink from "./controls/StyledLink";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Heading } from "./Typography";

import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);

  const menuBar = user ? (
    <NavLinks>
      <li>
        <StyledLink to="/">Hi, {user.username}</StyledLink>
      </li>
      <li>
        <StyledLink to="/create-post">Create post</StyledLink>
      </li>
      <li>
        <StyledLink onClick={logout} to="/">
          Log Out
        </StyledLink>
      </li>
    </NavLinks>
  ) : (
    <NavLinks>
      <li>
        <StyledLink to="/login">Login</StyledLink>
      </li>
      <li>
        <StyledLink to="/register">Register</StyledLink>
      </li>
    </NavLinks>
  );

  return (
    <Header>
      <Nav>
        <Link to="/">
          <Heading textTransform="uppercase">Means</Heading>
        </Link>

        {menuBar}
      </Nav>
    </Header>
  );
}

export default MenuBar;

const Header = styled.header`
  background: var(--secondaryBackground);
  position: sticky;
  top: 0;
  border-bottom: 1px solid #eaeaea;
`;

const Nav = styled.nav`
  padding: 2rem 1rem;
  max-width: 64rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;

  li {
    list-style: none;
  }
`;
