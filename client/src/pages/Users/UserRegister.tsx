import React from "react";
import { IUserRegister, IAlert, IUserForm } from "../../utilities/types";
import { userRegisterForm, alertDataReset } from "../../utilities/formValues";
import { useFormValidation, useAppDispatch } from "../../utilities/hooks";
import { usersRegister } from "../../utilities/slice/userSlice";
import UserRegisterForm from "../../components/User/UserRegisterForm";
import SnackAlert from "../../components/SnackAlert";

type AppProps = {
  openUserForm: boolean;
  setOpenUserForm: any;
};

function UserRegister({ openUserForm, setOpenUserForm }: AppProps) {
  const dispatch = useAppDispatch();
  const [defaultValue, setDefaultValue] =
    React.useState<IUserRegister>(userRegisterForm);

  const [alertData, setAlert] = React.useState<IAlert>(alertDataReset);
  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    setAlert(alertDataReset);
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    const postUserRegister: IUserForm = {
      role: "USER",
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      password: formValues.password,
    };
    await dispatch(usersRegister(postUserRegister)).then((res) => {
      if (res.type === "users/register/fulfilled") {
        setAlert({
          open: true,
          message: "Registration awaits in approval.",
          severity: "success",
        });
        onClickHandlerFormClose();
      } else {
        setAlert({
          open: true,
          message: res.payload,
          severity: "error",
        });
      }
    });
  };

  const { onChangeHandler, onClickHandler, formErrors, formValues, resetForm } =
    useFormValidation({
      callback: onClickSubmitHandler,
      fieldsToValidate: [
        "email",
        "firstName",
        "lastName",
        "password",
        "confirmPassword",
      ],
    });

  const onClickHandlerFormClose = () => {
    setOpenUserForm(false);
    resetForm();
    setDefaultValue(userRegisterForm);
  };

  return (
    <React.Fragment>
      <UserRegisterForm
        openUserForm={openUserForm}
        formErrors={formErrors}
        defaultValue={defaultValue}
        onChange={onChangeHandler}
        onClickHandler={onClickHandler}
        onClickHandlerFormClose={onClickHandlerFormClose}
      />
      <SnackAlert
        alertData={alertData}
        onClickCloseAlert={onClickCloseAlertHandler}
      />
    </React.Fragment>
  );
}

export default UserRegister;
