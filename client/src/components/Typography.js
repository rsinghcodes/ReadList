import styled from "styled-components";

export const Heading = styled.h3`
  text-transform: ${(props) => props.textTransform || "none"};
  color: var(--text-highlight);
  font-size: 1.5rem;
  font-weight: 700;
`;

export const Paragraph = styled.p`
  font-size: 0.7rem;
  color: var(--text);
  font-weight: 400;
`;
