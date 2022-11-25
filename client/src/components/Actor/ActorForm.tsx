import React from "react";
import { IObjectAny, IActorForm } from "../../utilities/types";
import { genderOptions } from "../../utilities/formValues";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from "@mui/material/Select";
import FormButton from "../../components/FormButton";
import FormText from "../../components/FormText";
import FormSelect from "../../components/FormSelect";
import FormDate from "../../components/FormDate";
import Modal from "@mui/material/Modal";

type AppProps = {
  openActorForm: boolean;
  formValues: IObjectAny;
  formErrors: IObjectAny;
  defaultValue: IActorForm;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  onClickHandlerFormClose: (
    event: Event | React.SyntheticEvent<any, Event>
  ) => void;
  onChangeDate: (newValue: string) => void;
  onClickHandler: any;
};

const ActorForm = ({
  openActorForm,
  formErrors,
  formValues,
  defaultValue,
  onClickHandler,
  onChange,
  onChangeSelect,
  onClickHandlerFormClose,
  onChangeDate,
}: AppProps) => {
  return (
    <React.Fragment>
      <Modal open={openActorForm}>
        <Box className="modalForm">
          <Box sx={{ flex: 1, width: 1, justifyContent: "flex-end" }}>
            <IconButton onClick={onClickHandlerFormClose}>
              <CloseIcon color="primary" />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormText
              value={defaultValue.firstName}
              name="firstName"
              label="First Name"
              type="search"
              error={formErrors.firstName}
              onChange={onChange}
            />
            <FormText
              value={defaultValue.lastName}
              name="lastName"
              label="Last Name"
              type="search"
              error={formErrors.lastName}
              onChange={onChange}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormSelect
              name="gender"
              value={formValues.gender || defaultValue.gender}
              label="Gender"
              error={formErrors.gender}
              options={genderOptions}
              onChange={onChangeSelect}
            />
            <FormDate
              error={formErrors.birthday}
              label="Birthday"
              value={formValues.birthday || defaultValue.birthday}
              onChange={onChangeDate}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormText
              value={defaultValue.imageLink}
              name="imageLink"
              label="Actor"
              type="search"
              error={formErrors.imageLink}
              onChange={onChange}
            />
            <Avatar
              variant="square"
              alt="Actor"
              src={formValues.imageLink}
              sx={{ width: 65, height: 65 }}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormButton label="Save" onClick={onClickHandler} />
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ActorForm;
