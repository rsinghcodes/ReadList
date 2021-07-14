import React from "react";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: "20px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "0",
    },
  },
});

export default function Input(props) {
  const classes = useStyles();
  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      className={classes.root}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
