import React from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { usersOne, usersUpdate } from "../../utilities/slice/userSlice";
import { SelectChangeEvent } from "@mui/material/Select";
import UserEditForm from "../../components/User/UserEditForm";

interface FormValues {
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  alert: AlertData;
}

interface FormErrors {
  role: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AlertData {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

interface PostUserValue {
  id: string;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
}

const UserEdit = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const userId = state;
  const user = useAppSelector((stateUser) => stateUser.users.dataOne);

  const [formValues, setFormValues] = React.useState<FormValues>({
    role: user.role || "USER",
    email: user.email || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    alert: {
      open: false,
      message: "",
      severity: "info",
    },
  });

  const [formErrors, setFormErrors] = React.useState<FormErrors>({
    role: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  React.useEffect(() => {
    dispatch(usersOne(userId));
  }, [dispatch, userId]);

  React.useEffect(() => {
    setFormValues((stateFormValues) => ({
      ...stateFormValues,
      role: user.role || "",
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    }));
  }, [user]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    switch (name) {
      case "email":
        setFormValues((stateEmailForm) => ({ ...stateEmailForm, email: value }));
        setFormErrors((stateEmailError) => ({ ...stateEmailError, email: "" }));
        break;
      case "firstName":
        setFormValues((stateFirstNameForm) => ({ ...stateFirstNameForm, firstName: value }));
        setFormErrors((stateFirstNameError) => ({ ...stateFirstNameError, firstName: "" }));
        break;
      case "lastName":
        setFormValues((stateLastNameForm) => ({ ...stateLastNameForm, lastName: value }));
        setFormErrors((stateLastNameError) => ({ ...stateLastNameError, lastName: "" }));
        break;
      default:
        break;
    }
  };

  const onChangeSelect = (event: SelectChangeEvent): void => {
    setFormValues((stateRoleForm) => ({
      ...stateRoleForm,
      role: event.target.value,
    }));
    setFormErrors((stateRoleError) => ({ ...stateRoleError, role: "" }));
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    if (formValidation()) {
      const postUserValue: PostUserValue = {
        id: userId,
        role: formValues.role,
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
      };

      await dispatch(usersUpdate(postUserValue)).then((res) => {
        if (res.type === "users/update/fulfilled") {
          setFormValues((stateAlertFormFulfilled) => ({
            ...stateAlertFormFulfilled,
            alert: {
              open: true,
              message: `Users updated.`,
              severity: "success",
            },
          }));
        } else {
          setFormValues((stateAlertFormReject) => ({
            ...stateAlertFormReject,
            alert: { open: true, message: res.payload, severity: "error" },
          }));
        }
      });
    }
  };

  const formValidation = (): boolean => {
    let valid = false;
    if (formValues.role === "")
      setFormErrors((stateRoleError) => ({
        ...stateRoleError,
        role: "Role is required.",
      }));
    if (formValues.email === "")
      setFormErrors((stateEmailError) => ({
        ...stateEmailError,
        email: "Email is required.",
      }));
    if (formValues.firstName === "")
      setFormErrors((stateFirstNameError) => ({
        ...stateFirstNameError,
        firstName: "First name is required.",
      }));
    if (formValues.lastName === "")
      setFormErrors((stateLastNameError) => ({
        ...stateLastNameError,
        lastName: "Last name is required.",
      }));

    if (
      formValues.role !== "" &&
      formValues.email !== "" &&
      formValues.firstName !== "" &&
      formValues.lastName !== ""
    ) {
      valid = true;
    }

    return valid;
  };

  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    setFormValues((stateAlertClose) => ({
      ...stateAlertClose,
      alert: { open: false, message: "", severity: "info" },
    }));
  };

  return (
    <UserEditForm
      formErrors={formErrors}
      formValues={formValues}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler}
      onChangeSelect={onChangeSelect}
      onClickCloseAlert={onClickCloseAlertHandler}
    />
  );
};

export default UserEdit;
