import React from "react";
import Box from "@mui/material/Box";
import FormButton from "../FormButton";
import FormText from "../FormText";
import FormSelect from "../FormSelect";
import { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import SnackAlert from "../SnackAlert";

type AppProps = {
  formErrors: FormValue;
  formValues: FormValue;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  alertData: AlertData;
  setAlertData: (value: AlertData) => void;
};

interface FormValue {
  role: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AlertData {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

const roleData = ["USER", "ADMIN"];

const UserEditForm = ({
  formErrors,
  formValues,
  onClick,
  onChange,
  onChangeSelect,
  alertData,
  setAlertData,
}: AppProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: "flex", width: 600, marginTop: 10 }}>
        <FormSelect
          name="role"
          value={formValues.role}
          label="Role"
          error={formErrors.role}
          options={roleData}
          onChange={onChangeSelect}
        />
      </Box>
      <Box sx={{ display: "flex", width: 600 }}>
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
      </Box>
      <Box sx={{ display: "flex", width: 600 }}>
        <FormText
          name="lastName"
          value={formValues.lastName}
          label="Last Name"
          type="search"
          error={formErrors.lastName}
          onChange={onChange}
        />
      </Box>
      <Box sx={{ display: "flex", width: 600 }}>
        <FormButton label="Back to List" onClick={() => navigate("../users")} />
        <FormButton label="Save" onClick={onClick} />
        <SnackAlert alertData={alertData} setAlertData={setAlertData} />
      </Box>
    </>
  );
};

export default UserEditForm;
