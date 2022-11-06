import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormButton from "../FormButton";
import FormText from "../FormText";
import SnackAlert from "../SnackAlert";

type AppProps = {
  formValues: FormValues;
  formErrors: FormErrors;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
};

interface FormValues {
  email: string;
  password: string;
  alert: AlertData;
}

interface FormErrors {
  email: string;
  password: string;
}

interface AlertData {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

const LoginForm = ({
  formValues,
  formErrors,
  onClick,
  onChange,
  onClickCloseAlert,
}: AppProps) => {
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
        </Box>
        <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
          <FormButton label="Login" onClick={onClick} />
        </Box>
      </Container>
      <SnackAlert
        alertData={formValues.alert}
        onClickCloseAlert={onClickCloseAlert}
      />
    </React.Fragment>
  );
};

export default LoginForm;
