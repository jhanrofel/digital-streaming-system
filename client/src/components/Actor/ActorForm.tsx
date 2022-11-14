import React from "react";
import { useNavigate } from "react-router-dom";
import { IObjectAny, IActorForm } from "../../utilities/types";
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
  formName: string;
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

export const genderData = ["Male", "Female"];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ActorForm = ({
  openActorForm,
  formName,
  formErrors,
  formValues,
  defaultValue,
  onClickHandler,
  onChange,
  onChangeSelect,
  onClickHandlerFormClose,
  onChangeDate,
}: AppProps) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Modal open={openActorForm}>
        <Box sx={style}>
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
              options={genderData}
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
              label="Image Link"
              type="search"
              error={formErrors.imageLink}
              onChange={onChange}
            />
            <Avatar
              variant="square"
              alt="Image Catalogue"
              src={formValues.imageLink}
              sx={{ width: 65, height: 65 }}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            {formName === "EditForm" && (
              <FormButton
                label="Back to List"
                onClick={() => navigate("../actors")}
              />
            )}
            <FormButton label="Save" onClick={onClickHandler} />
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ActorForm;
