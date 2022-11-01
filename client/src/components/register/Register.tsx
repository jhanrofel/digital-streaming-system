import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormButton from "../../components/FormButton";
import FormText from "../../components/FormText";

type AppProps = {
  formErrors: FormValue;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

interface FormValue {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm: string;
}

const RegistrationForm = ({ formErrors, onClick, onChange }: AppProps) => {
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#EAF2FE", display: "flex", flexWrap: "wrap" }}>
          <div className="form-header">REGISTRATION</div>
          <FormText
            name="email"
            label="Email"
            type="search"
            error={formErrors.email}
            onChange={onChange}
          />
          <FormText
            name="firstName"
            label="First Name"
            type="search"
            error={formErrors.firstName}
            onChange={onChange}
          />
          <FormText
            name="lastName"
            label="Last Name"
            type="search"
            error={formErrors.lastName}
            onChange={onChange}
          />
          <FormText
            name="password"
            label="Password"
            type="password"
            error={formErrors.password}
            onChange={onChange}
          />
          <FormText
            name="confirm"
            label="Confirm Password"
            type="password"
            error={formErrors.confirm}
            onChange={onChange}
          />
          <FormButton label="Create Account" onClick={onClick} />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default RegistrationForm;
