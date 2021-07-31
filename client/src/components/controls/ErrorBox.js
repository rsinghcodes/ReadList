import styled from "styled-components";

const ErrorBox = styled.div`
  width: 100%;
  color: #d63301;
  background: #ffccba;
  text-align: center;
  border-radius: var(--border-radius);
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid;

  li {
    font-size: 1rem;
    margin: 0.2rem;
    list-style: none;
  }
`;

export default ErrorBox;
