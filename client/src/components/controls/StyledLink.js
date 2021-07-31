import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  padding: 0.8rem;
  text-decoration: none;
  font-family: inherit;
  text-transform: uppercase;
  color: var(--text);
  cursor: pointer;
  transition: color 0.2s ease-out;

  &:hover {
    color: var(--primary);
    background: var(--background);
  }
`;

export default StyledLink;
