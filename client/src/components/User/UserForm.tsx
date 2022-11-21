import React from "react";
import { IObjectAny, IUserForm } from "../../utilities/types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from "@mui/material/Select";
import FormButton from "../../components/FormButton";
import FormText from "../../components/FormText";
import FormSelect from "../../components/FormSelect";
import Modal from "@mui/material/Modal";

type AppProps = {
  openUserForm: boolean;
  formValues: IObjectAny;
  formErrors: IObjectAny;
  defaultValue: IUserForm;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect: (event: SelectChangeEvent) => void;
  onClickHandlerFormClose: (
    event: Event | React.SyntheticEvent<any, Event>
  ) => void;
  onClickHandler: any;
};

export const roleData = ["USER", "ADMIN"];

const UserForm = ({
  openUserForm,
  formErrors,
  formValues,
  defaultValue,
  onClickHandler,
  onChange,
  onChangeSelect,
  onClickHandlerFormClose,
}: AppProps) => {
  return (
    <React.Fragment>
      <Modal open={openUserForm}>
        <Box className="modalForm">
          <Box sx={{ flex: 1, width: 1, justifyContent: "flex-end" }}>
            <IconButton onClick={onClickHandlerFormClose}>
              <CloseIcon color="primary" />
            </IconButton>
          </Box>
          <Box>
          <FormSelect
              name="role"
              value={formValues.role || defaultValue.role}
              label="Role"
              error={formErrors.role}
              options={roleData}
              onChange={onChangeSelect}
            />
          </Box>
          <Box>
            <FormText
              value={defaultValue.email}
              name="email"
              label="Email"
              type="search"
              error={formErrors.email}
              onChange={onChange}
            />
          </Box>
          <Box>
            <FormText
              value={defaultValue.firstName}
              name="firstName"
              label="First Name"
              type="search"
              error={formErrors.firstName}
              onChange={onChange}
            />
          </Box>
          <Box>
            <FormText
              value={defaultValue.lastName}
              name="lastName"
              label="Last Name"
              type="search"
              error={formErrors.lastName}
              onChange={onChange}
            />
          </Box>
          <Box>
            <FormButton label="Save" onClick={onClickHandler} />
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default UserForm;
