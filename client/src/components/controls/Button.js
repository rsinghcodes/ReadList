import React from "react";
import styled from "styled-components";

const Button = ({ type, children }) => {
  return <StyledButton type={type}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  width: 100%;
  outline: none;
  border: none;
  padding: 1rem;
  border-radius: 0.2rem;
  font-family: inherit;
  cursor: pointer;
  background-color: #555bff;
  color: white;
`;
