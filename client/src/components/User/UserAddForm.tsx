import React from "react";
import Box from "@mui/material/Box";
import FormButton from "../FormButton";
import FormText from "../FormText";
import FormSelect from "../FormSelect";
import { SelectChangeEvent } from "@mui/material/Select";
import SnackAlert from "../SnackAlert";

type AppProps = {
  formValues: FormValue;
  formErrors: FormValue;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  alertData: AlertData;
  setAlertData: (value: AlertData) => void;
};

interface FormValue {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}
interface AlertData {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

const roleData = ["USER", "ADMIN"];

const UserAddForm = ({
  formErrors,
  formValues,
  onClick,
  onChange,
  onChangeSelect,
  alertData,
  setAlertData,
}: AppProps) => {
  return (
    <>
      <Box sx={{ display: "flex", width: 600 }}>
        <FormSelect
          name="role"
          value={formValues.role}
          label="Role"
          error={formErrors.role}
          options={roleData}
          onChange={onChangeSelect}
        />
        <FormText
          name="email"
          value={formValues.email}
          label="Email"
          type="search"
          error={formErrors.email}
          onChange={onChange}
        />
      </Box>
      <Box sx={{ display: "flex", width: 600 }}>
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
      </Box>
      <Box sx={{ width: 600 }}>
        <FormButton label="Save" onClick={onClick} />
      </Box>
      <SnackAlert alertData={alertData} setAlertData={setAlertData} />
    </>
  );
};

export default UserAddForm;
