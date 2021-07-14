import React from "react";
import { Box, Button } from "@material-ui/core";

import Input from "../components/Input";

const Register = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      style={{ minHeight: "90vh" }}
    >
      <form
        noValidate
        autoComplete="off"
        style={{ width: "380px", display: "flex", flexDirection: "column" }}
      >
        <Input label="Email" name="email" />
        <Input label="Username" name="username" />
        <Input label="Password" name="password" />

        <Button variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
