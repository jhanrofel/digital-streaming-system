import React from "react";
import { ILoginFormErrors, ILoginFormValues } from "../../utilities/types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormButton from "../FormButton";
import FormText from "../FormText";
import SnackAlert from "../SnackAlert";

type AppProps = {
  formValues: ILoginFormValues;
  formErrors: ILoginFormErrors;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
};

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
        <Box>
          <Typography
            variant="h5"
            sx={{ width: 1, display: "flex", justifyContent: "center" }}
          >
            SIGN IN
          </Typography>
          <FormText
            test-id="email"
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
