import React from "react";
import { IUserFormErrors, IUserFormValues } from "../../utilities/types";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import FormButton from "../FormButton";
import FormSelect from "../FormSelect";
import FormText from "../FormText";
import SnackAlert from "../SnackAlert";

type AppProps = {
  formValues: IUserFormValues;
  formErrors: IUserFormErrors;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
};

const roleData = ["USER", "ADMIN"];

const UserAddForm = ({
  formErrors,
  formValues,
  onClick,
  onChange,
  onChangeSelect,
  onClickCloseAlert,
}: AppProps) => {
  return (
    <React.Fragment>
      <Box sx={{ width: 600 }}>
        <FormSelect
          name="role"
          value={formValues.role}
          label="Role"
          error={formErrors.role}
          options={roleData}
          onChange={onChangeSelect}
        />
      </Box>
      <Box sx={{ width: 600 }}>
        <FormText
          name="email"
          value={formValues.email}
          label="Email"
          type="search"
          error={formErrors.email}
          onChange={onChange}
        />
      </Box>
      <Box sx={{ width: 600 }}>
        <FormText
          name="firstName"
          value={formValues.firstName}
          label="First Name"
          type="search"
          error={formErrors.firstName}
          onChange={onChange}
        />
      </Box>
      <Box sx={{ width: 600 }}>
        <FormText
          name="lastName"
          value={formValues.lastName}
          label="Last Name"
          type="search"
          error={formErrors.lastName}
          onChange={onChange}
        />
      </Box>
      <Box sx={{ width: 200 }}>
        <FormButton label="Save" onClick={onClick} />
      </Box>
      <SnackAlert
        alertData={formValues.alert}
        onClickCloseAlert={onClickCloseAlert}
      />
    </React.Fragment>
  );
};

export default UserAddForm;
