import React from "react";
import { IObjectAny, IUserRegister } from "../../utilities/types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormButton from "../FormButton";
import FormText from "../FormText";
import Modal from "@mui/material/Modal";

type AppProps = {
  openUserForm: boolean;
  formErrors: IObjectAny;  
  defaultValue: IUserRegister;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClickHandlerFormClose: (
    event: Event | React.SyntheticEvent<any, Event>
  ) => void;
  onClickHandler: any;
};

const UserRegisterForm = ({
  openUserForm,
  formErrors,
  defaultValue,
  onClickHandler,
  onChange,
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
            <FormText
              value={defaultValue.password}
              name="password"
              label="Password"
              type="password"
              error={formErrors.password}
              onChange={onChange}
            />
          </Box>
          <Box>
            <FormText
              value={defaultValue.confirmPassword}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              error={formErrors.confirmPassword}
              onChange={onChange}
            />
          </Box>
          <Box>
            <FormButton label="Register" onClick={onClickHandler} />
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default UserRegisterForm;