import { useState } from "react";

export function useForm(callback, initialState = {}) {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
    setValues,
  };
}

export const Form = (props) => {
  const { children, ...other } = props;
  return (
    <form autoComplete="off" {...other}>
      {children}
    </form>
  );
};
