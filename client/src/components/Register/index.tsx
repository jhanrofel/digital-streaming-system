import React from "react";
import {
  IRegisterFormErrors,
  IRegisterFormValues,
} from "../../utilities/types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormButton from "../FormButton";
import FormText from "../FormText";
import SnackAlert from "../SnackAlert";

type AppProps = {
  formValues: IRegisterFormValues;
  formErrors: IRegisterFormErrors;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
};

const RegistrationForm = ({
  formValues,
  formErrors,
  onClick,
  onChange,
  onClickCloseAlert,
}: AppProps) => {
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <div className="form-header">REGISTRATION</div>
          <FormText
            name="email"
            value={formValues.email}
            label="Email"
            type="search"
            error={formErrors.email}
            onChange={onChange}
          />
          <FormText
            name="firstName"
            value={formValues.firstName}
            label="First Name"
            type="search"
            error={formErrors.firstName}
            onChange={onChange}
          />
          <FormText
            name="lastName"
            value={formValues.lastName}
            label="Last Name"
            type="search"
            error={formErrors.lastName}
            onChange={onChange}
          />
          <FormText
            name="password"
            value={formValues.password}
            label="Password"
            type="password"
            error={formErrors.password}
            onChange={onChange}
          />
          <FormText
            name="confirm"
            value={formValues.confirm}
            label="Confirm Password"
            type="password"
            error={formErrors.confirm}
            onChange={onChange}
          />
        </Box>
        <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
          <FormButton label="Create Account" onClick={onClick} />
        </Box>
      </Container>
      <SnackAlert
        alertData={formValues.alert}
        onClickCloseAlert={onClickCloseAlert}
      />
    </React.Fragment>
  );
};

export default RegistrationForm;
