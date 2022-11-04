import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormButton from "../FormButton";
import FormText from "../FormText";
import SnackAlert from "../SnackAlert";

type AppProps = {
  formErrors: FormValue;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  alertData: AlertData;
  setAlertData: (value: AlertData) => void;
};

interface FormValue {
  email: string;
  password: string;
}

interface AlertData {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

const LoginForm = ({
  formErrors,
  onClick,
  onChange,
  alertData,
  setAlertData,
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
          <FormButton label="Login" onClick={onClick} />
        </Box>
      </Container>
      <SnackAlert alertData={alertData} setAlertData={setAlertData} />
    </React.Fragment>
  );
};

export default LoginForm;
