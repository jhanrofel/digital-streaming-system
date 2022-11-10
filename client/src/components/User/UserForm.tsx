import React from "react";
import { useNavigate } from "react-router-dom";
import { IUserFormErrors, IUserFormValues } from "../../utilities/types";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import FormButton from "../FormButton";
import FormText from "../FormText";
import FormSelect from "../FormSelect";
import SnackAlert from "../SnackAlert";

type AppProps = {
  formName: string;
  formValues: IUserFormValues;
  formErrors: IUserFormErrors;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
};

const roleData = ["USER", "ADMIN"];

const UserForm = ({
  formName,
  formErrors,
  formValues,
  onClick,
  onChange,
  onChangeSelect,
  onClickCloseAlert,
}: AppProps) => {
  const navigate = useNavigate();
  const margitTopValue: number = formName === "EditForm" ? 10 : 0;

  return (
    <React.Fragment>
      <Box sx={{ width: 600, marginTop: margitTopValue }}>
        <Box>
          <FormSelect
            name="role"
            value={formValues.role}
            label="Role"
            error={formErrors.role}
            options={roleData}
            onChange={onChangeSelect}
          />
        </Box>
        <Box>
          <FormText
            name="email"
            value={formValues.email}
            label="Email"
            type="search"
            error={formErrors.email}
            onChange={onChange}
          />
        </Box>
        <Box>
          <FormText
            name="firstName"
            value={formValues.firstName}
            label="First Name"
            type="search"
            error={formErrors.firstName}
            onChange={onChange}
          />
        </Box>
        <Box>
          <FormText
            name="lastName"
            value={formValues.lastName}
            label="Last Name"
            type="search"
            error={formErrors.lastName}
            onChange={onChange}
          />
        </Box>
        <Box>
          {formName === "EditForm" && (
            <FormButton
              label="Back to List"
              onClick={() => navigate("../users")}
            />
          )}

          <FormButton label="Save" onClick={onClick} />
          <SnackAlert
            alertData={formValues.alert}
            onClickCloseAlert={onClickCloseAlert}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default UserForm;
