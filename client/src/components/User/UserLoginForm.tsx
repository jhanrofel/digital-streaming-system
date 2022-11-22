import React from "react";
import { IObjectAny,IUserLogin } from "../../utilities/types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormButton from "../FormButton";
import FormText from "../FormText";
import Modal from "@mui/material/Modal";

type AppProps = {
  openUserForm: boolean;
  formErrors: IObjectAny;  
  defaultValue: IUserLogin;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClickHandlerFormClose: (
    event: Event | React.SyntheticEvent<any, Event>
  ) => void;
  onClickHandler: any;
  onClickHandlerRegister: any;
};

const UserLoginForm = ({
  openUserForm,
  formErrors,
  defaultValue,
  onClickHandler,
  onClickHandlerRegister,
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
              value={defaultValue.password}
              name="password"
              label="Password"
              type="password"
              error={formErrors.password}
              onChange={onChange}
            />
          </Box>
          <Box>
            <FormButton label="Login" onClick={onClickHandler} />
            <FormButton label="Register" onClick={onClickHandlerRegister} />
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default UserLoginForm;
