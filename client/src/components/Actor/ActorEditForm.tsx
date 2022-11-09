import React from "react";
import { useNavigate } from "react-router-dom";
import { IAlert } from "../../utilities/types";
import { Dayjs } from "dayjs";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { SelectChangeEvent } from "@mui/material/Select";
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
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
  setBirthday: any;
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

const ActorEditForm = ({
  formErrors,
  formValues,
  birthday,
  onClick,
  onChange,
  onChangeSelect,
  setBirthday,
  onClickCloseAlert,
}: AppProps) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", width: 600, marginTop: 10 }}>
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
        sx={{ display: "flex", width: 600, paddingTop: 5 }}
        textAlign="left"
      >
        LINKS
      </Divider>
      <Box sx={{ display: "flex", width: 600 }}>
        <FormText
          name="catalogue"
          value={formValues.catalogue}
          label="Catalogue"
          type="search"
          error={formErrors.catalogue}
          onChange={onChange}
        />
        <Avatar
          variant="square"
          alt="Image Catalogue"
          src={formValues.catalogue}
          sx={{ width: 65, height: 65 }}
        />
      </Box>
      <Box sx={{ display: "flex", width: 600 }}>
        <FormButton
          label="Back to List"
          onClick={() => navigate("../actors")}
        />
        <FormButton label="Save" onClick={onClick} />
        <SnackAlert
          alertData={formValues.alert}
          onClickCloseAlert={onClickCloseAlert}
        />
      </Box>
    </React.Fragment>
  );
};

export default ActorEditForm;
