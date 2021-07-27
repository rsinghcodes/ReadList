import React, { useContext } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);

  const menuBar = user ? (
    <Nav>
      <Logo>
        <Link to="/">Means</Link>
      </Logo>
      {/* <NavLinks>
        <NavLink onClick={logout}>Logout</NavLink>
      </NavLinks> */}
    </Nav>
  ) : (
    <Nav>
      <Logo>
        <Link to="/">Means</Link>
      </Logo>
      <NavLinks>
        <NavLink>
          <Link to="/login">Login</Link>
        </NavLink>
        <NavLink>
          <Link to="/register">Register</Link>
        </NavLink>
      </NavLinks>
    </Nav>
  );

  return menuBar;
}

export default MenuBar;

const Nav = styled.nav`
  padding: 1rem;
  background: #fff;
  max-width: 64rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  border-bottom: 1px solid rgba(229, 231, 235, 1);
`;

const Logo = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;

  a {
    color: #212121;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLink = styled.li`
  padding: 1rem;
  list-style: none;
  cursor: pointer;

  :last-child {
    padding-right: 0;
  }
  a {
    color: #212121;
  }
`;
