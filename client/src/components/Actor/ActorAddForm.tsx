import React from "react";
import { IAlert } from "../../utilities/types";
import { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import FormButton from "../../components/FormButton";
import FormText from "../../components/FormText";
import FormSelect from "../../components/FormSelect";
import FormDate from "../../components/FormDate";
import SnackAlert from "../SnackAlert";

type AppProps = {
  formValues: FormValues;
  formErrors: FormErrors;
  birthday: Dayjs | null;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  setBirthday: any;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
};

interface FormValues {
  firstName: string;
  lastName: string;
  gender: string;
  catalogue: string;
  alert: IAlert;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  catalogue: string;
}

const genderData = ["Male", "Female"];

const ActorAddForm = ({
  formErrors,
  formValues,
  birthday,
  onClick,
  onChange,
  onChangeSelect,
  setBirthday,
  onClickCloseAlert,
}: AppProps) => {
  return (
    <React.Fragment>
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
      <Box sx={{ display: "flex", width: 600 }}>
        <FormSelect
          name="gender"
          value={formValues.gender}
          label="Gender"
          error={formErrors.gender}
          options={genderData}
          onChange={onChangeSelect}
        />
        <FormDate
          error={formErrors.birthday}
          label="Birthday"
          value={birthday}
          setNewValue={setBirthday}
        />
      </Box>
      <Divider
        sx={{ display: "flex", width: 600, paddingTop: 2 }}
        textAlign="left"
      >
        LINKS
      </Divider>
      <Box sx={{ width: 600 }}>
        <FormText
          name="catalogue"
          value={formValues.catalogue}
          label="Catalogue"
          type="search"
          error={formErrors.catalogue}
          onChange={onChange}
        />
      </Box>
      <Box sx={{ width: 600 }}>
        <FormButton label="Save" onClick={onClick} />
      </Box>
      <SnackAlert
        alertData={formValues.alert}
        onClickCloseAlert={onClickCloseAlert}
      />
    </React.Fragment>
  );
};

export default ActorAddForm;
