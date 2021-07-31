import React from "react";
import styled from "styled-components";

const InputArea = styled.div`
  position: relative;
  height: 3rem;
  margin: 1.5rem 0;

  .input__label {
    position: absolute;
    left: 1rem;
    top: 0.9rem;
    padding: 0 0.5rem;
    color: var(--text);
    background: var(--background);
    pointer-events: none;
    transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
  }

  .input__field {
    width: 100%;
    height: 100%;
    border: 2px solid currentColor;
    padding: 0.5rem 1rem;
    color: currentColor;
    background: transparent;
    border-radius: var(--border-radius);
    font-family: inherit;
    font-size: 1rem;

    :focus {
      border-color: var(--primary);
    }

    :focus,
    :not(:placeholder-shown) {
      & + .input__label {
        top: -0.5rem;
        left: 0.8rem;
        font-size: 0.8rem;
        color: #fab700;
      }
    }
  }
`;

const Input = (props) => {
  const { name, label, type, value, onChange } = props;

  return (
    <InputArea>
      <input
        className="input__field"
        name={name}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
      />
      <span className="input__label">{label}</span>
    </InputArea>
  );
};

export default Input;
