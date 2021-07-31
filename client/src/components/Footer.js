import React from "react";
import styled from "styled-components";

const Footer = () => {
  return <FooterBar>Proudly created by Raghvendra Singh.</FooterBar>;
};

export default Footer;

const FooterBar = styled.footer`
  max-width: 64rem;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 2rem 0;
  color: var(--text);
  border-top: 1px solid rgba(229, 231, 235, 1);
`;
