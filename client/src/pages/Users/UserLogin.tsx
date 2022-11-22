import React from "react";
import { useNavigate } from "react-router-dom";
import { cookiesCreate } from "../../utilities/cookies";
import { loggedInCreate } from "../../utilities/loggedIn";
import { IUserLogin, IAlert } from "../../utilities/types";
import { userLogin, alertDataReset } from "../../utilities/formValues";
import SnackAlert from "../../components/SnackAlert";
import { useFormValidation, useAppDispatch } from "../../utilities/hooks";
import { usersLogin, usersData } from "../../utilities/slice/userSlice";
import UserLoginForm from "../../components/User/UserLoginForm";

type AppProps = {
  openUserForm: boolean;
  setOpenUserForm: any;
  setOpenUserRegisterForm: any;
};

function UserLogin({
  openUserForm,
  setOpenUserForm,
  setOpenUserRegisterForm,
}: AppProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [defaultValue, setDefaultValue] = React.useState<IUserLogin>(userLogin);

  const [alertData, setAlert] = React.useState<IAlert>(alertDataReset);
  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    setAlert(alertDataReset);
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    const postUserLogin: IUserLogin = {
      email: formValues.email,
      password: formValues.password,
    };
    await dispatch(usersLogin(postUserLogin)).then((res) => {
      if (res.type === "users/login/fulfilled") {
        cookiesCreate(res.payload);
        dispatch(usersData()).then((res) => {
          if (res.type === "users/me/fulfilled") {
            loggedInCreate(res.payload.user);
            if (res.payload.user.role === "ADMIN") {
              navigate("/dashboard");
            } else {
              setOpenUserForm(false);
              setAlert({
                open: true,
                message: "Login success.",
                severity: "success",
              });
            }
          } else {
            setAlert({
              open: true,
              message: res.payload,
              severity: "error",
            });
          }
        });
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
      fieldsToValidate: ["email", "password"],
    });

  const onClickHandlerRegister = (event: React.FormEvent<HTMLFormElement>) => {
    onClickHandlerFormClose();
    setOpenUserRegisterForm(true);
  };

  const onClickHandlerFormClose = () => {
    setOpenUserForm(false);
    resetForm();
    setDefaultValue(userLogin);
  };

  return (
    <React.Fragment>
      <UserLoginForm
        openUserForm={openUserForm}
        formErrors={formErrors}
        defaultValue={defaultValue}
        onChange={onChangeHandler}
        onClickHandler={onClickHandler}
        onClickHandlerRegister={onClickHandlerRegister}
        onClickHandlerFormClose={onClickHandlerFormClose}
      />
      <SnackAlert
        alertData={alertData}
        onClickCloseAlert={onClickCloseAlertHandler}
      />
    </React.Fragment>
  );
}

export default UserLogin;
