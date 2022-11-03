import React from "react";
import Box from "@mui/material/Box";
import FormButton from "../../components/FormButton";
import FormText from "../../components/FormText";
import FormSelect from "../../components/FormSelect";
import FormDate from "../../components/FormDate";
import { SelectChangeEvent } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { Dayjs } from "dayjs";

type AppProps = {
  formErrors: FormErrors;
  formValues: FormValue;
  birthday: Dayjs | null;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  setBirthday: any;
};

interface FormValue {
  firstName: string;
  lastName: string;
  gender: string;
  banner: string;
  catalogue: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  gender: string;
  birthday:  string;
  banner: string;
  catalogue: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

const genderData = ["Male", "Female"];

const ActorAddForm = ({
  formErrors,
  formValues,
  birthday,
  onClick,
  onChange,
  onChangeSelect,
  setBirthday
}: AppProps) => {
  

  return (
    <>
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
        <FormDate error={formErrors.birthday} label="Birthday" value={birthday} setNewValue={setBirthday} />
      </Box>
      <Divider
        sx={{ display: "flex", width: 600, paddingTop: 5 }}
        textAlign="left"
      >
        LINKS
      </Divider>
      <Box sx={{ width: 600 }}>
        <FormText
          name="banner"
          value={formValues.banner}
          label="Banner"
          type="search"
          error={formErrors.banner}
          onChange={onChange}
        />
        <FormText
          name="catalogue"
          value={formValues.catalogue}
          label="Catalogue"
          type="search"
          error={formErrors.catalogue}
          onChange={onChange}
        />
        <FormText
          name="facebook"
          value={formValues.facebook}
          label="Faceboook"
          type="search"
          onChange={onChange}
        />
        <FormText
          name="instagram"
          value={formValues.instagram}
          label="Instagram"
          type="search"
          onChange={onChange}
        />
        <FormText
          name="youtube"
          value={formValues.youtube}
          label="Youtube Channel"
          type="search"
          onChange={onChange}
        />
      </Box>
      <Box sx={{ width: 600 }}>
        <FormButton label="Save" onClick={onClick} />
      </Box>
    </>
  );
};

export default ActorAddForm;
