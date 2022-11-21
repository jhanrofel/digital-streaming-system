import React from "react";
import Container from "@mui/material/Container";
import {
  useAppDispatch,
  useAppSelector,
  useFormValidation,
} from "../../utilities/hooks";
import {
  usersApproved,
  usersDelete,
  usersUpdate,
  usersRegister,
  clearSelected,
} from "../../utilities/slice/userSlice";
import {
  IUserData,
  IUserForm,
  IUserFormPatch,
  IAlert,
} from "../../utilities/types";
import { alertDataReset, userForm } from "../../utilities/formValues";
import DeleteDialogue from "../../components/Dialog/DeleteDialog";
import FormList from "../../components/FormList";
import FormHeader from "../../components/FormHeader";
import UserForm from "../../components/User/UserForm";
import SnackAlert from "../../components/SnackAlert";
import UserData from "./UserData";

const UserList = () => {
  const dispatch = useAppDispatch();
  const userSelected = useAppSelector((state) => state.users.selected);
  const user = useAppSelector((state) => state.users.byId);
  const [defaultValue, setDefaultValue] = React.useState<IUserForm>(userForm);
  const rows: IUserData[] = useAppSelector((state) => state.users.list);

  const onClickDeleteIcon = () => {
    setOpenDialogue(true);
  };

  const onClickEditIcon = () => {
    if (user) {
      setDefaultValue({
        ...defaultValue,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }

    setTimeout(() => {
      setOpenUserForm(true);
    }, 100);
  };

  const onClickActivateIcon = async (params: IUserFormPatch) => {
    await dispatch(usersUpdate(params));
  };

  const { columns } = UserData({
    callbackDelete: onClickDeleteIcon,
    callbackEdit: onClickEditIcon,
    callbackActivate: onClickActivateIcon,
  });

  const onConfirmDelete = async (): Promise<void> => {
    if (userSelected) {
      await dispatch(usersDelete(userSelected)).then((res) => {
        if (res.type === "users/delete/fulfilled") {
          setOpenDialogue(false);
        } else {
          setAlert({ open: true, message: res.payload, severity: "error" });
          setOpenDialogue(false);
        }
      });
    }
  };

  React.useEffect(() => {
    dispatch(usersApproved());
  }, [dispatch]);

  React.useEffect(() => {
    if (user) {
      const newValue = {
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      setDefaultValue({ ...userForm, ...newValue });
      setForm(newValue);
    } // eslint-disable-next-line
  }, [user]);

  const onClickHandlerFormClose = () => {
    setOpenUserForm(false);
    dispatch(clearSelected());
    resetForm();
    setDefaultValue(userForm);
  };

  const onClickHandlerFormOpen = () => {
    setOpenUserForm(true);
  };
  const headerButtons = [{ label: "Add", onClick: onClickHandlerFormOpen }];

  const onClickSubmitHandler = async (): Promise<void> => {
    const postUserForm: IUserForm = {
      role: formValues.role,
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
    };

    const dispatchResponse =
      user && user.id
        ? await dispatch(
            usersUpdate({
              ...postUserForm,
              id: user.id,
            })
          )
        : await dispatch(
            usersRegister({
              ...postUserForm,
              approval: "approved",
              password: "12345",
            })
          );

    if (dispatchResponse.type === "users/register/fulfilled") {
      resetFormValues();
      setAlert({
        open: true,
        message: `Users added!`,
        severity: "success",
      });
    } else if (dispatchResponse.type === "users/update/fulfilled") {
      resetFormValues();
      setAlert({
        open: true,
        message: `Users updated!`,
        severity: "success",
      });
    } else {
      setAlert({
        open: true,
        message: dispatchResponse.payload,
        severity: "error",
      });
    }
  };

  const {
    onChangeHandler,
    onClickHandler,
    onChangeSelect,
    formValues,
    formErrors,
    resetForm,
    setForm,
  } = useFormValidation({
    callback: onClickSubmitHandler,
    fieldsToValidate: ["firstName", "lastName", "role", "email"],
  });

  const [openUserForm, setOpenUserForm] = React.useState(false);

  const [openDialogue, setOpenDialogue] = React.useState<boolean>(false);

  const [alertData, setAlert] = React.useState<IAlert>(alertDataReset);
  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    setAlert(alertDataReset);
  };

  const resetFormValues = () => {
    setOpenUserForm(false);
    resetForm();
    setAlert(alertDataReset);
    setDefaultValue(userForm);
  };

  return (
    <React.Fragment>
      <Container sx={{ marginTop: 10 }}>
        <FormHeader header="USERS" buttons={headerButtons} />
        <FormList rows={rows} columns={columns} />
        <DeleteDialogue
          setOpen={setOpenDialogue}
          open={openDialogue}
          onConfirmDelete={onConfirmDelete}
        />
      </Container>
      <UserForm
        openUserForm={openUserForm}
        formErrors={formErrors}
        formValues={formValues}
        defaultValue={defaultValue}
        onChange={onChangeHandler}
        onClickHandler={onClickHandler}
        onChangeSelect={onChangeSelect}
        onClickHandlerFormClose={onClickHandlerFormClose}
      />
      <SnackAlert
        alertData={alertData}
        onClickCloseAlert={onClickCloseAlertHandler}
      />
    </React.Fragment>
  );
};

export default UserList;
