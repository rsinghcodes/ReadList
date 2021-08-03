import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

export const Form = (props) => {
  const { children, ...other } = props;
  return (
    <form autoComplete="off" {...other}>
      {children}
    </form>
  );
};

// const StyledForm = styled.form`
//   max-width: 30rem;
//   width: 100%;
//   margin: 0 auto;
//   background: inherit;
//   padding: calc(4 * 0.5rem);
//   margin: calc(4 * 0.5rem) auto;
//   border-radius: 4px;
//   border: 3px solid #212121;
//   box-shadow: 0.5rem 0.5rem 0 #212121;

//   *:first-child {
//     margin-top: 0;
//   }
// `;
