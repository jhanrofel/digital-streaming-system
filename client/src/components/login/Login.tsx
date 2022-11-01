import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormButton from "../FormButton";
import FormText from "../FormText";

type AppProps = {
  formErrors: FormValue;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

interface FormValue {
  email: string;
  password: string;
}

const LoginForm = ({ formErrors, onClick, onChange }: AppProps) => {
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#ffffff", display: "flex", flexWrap: "wrap" }}>
          <div className="form-header">SIGN IN</div>
          <FormText
            name="email"
            label="Email"
            type="search"
            error={formErrors.email}
            onChange={onChange}
          />
          <FormText
            name="password"
            label="Password"
            type="password"
            error={formErrors.password}
            onChange={onChange}
          />
          <FormButton label="Login" onClick={onClick} />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default LoginForm;
