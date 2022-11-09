import React from "react";
import { userFormErrors, userFormValues } from "../../utilities/formValues";
import { useAppDispatch } from "../../utilities/hooks";
import { usersRegister } from "../../utilities/slice/userSlice";
import {
  IUserFormErrors,
  IUserFormValues,
  IUserFormPost,
} from "../../utilities/types";
import { SelectChangeEvent } from "@mui/material/Select";
import UserAddForm from "../../components/User/UserAddForm";

const UserAdd = () => {
  const dispatch = useAppDispatch();
  const [formErrors, setFormErrors] =
    React.useState<IUserFormErrors>(userFormErrors);
  const [formValues, setFormValues] =
    React.useState<IUserFormValues>(userFormValues);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    switch (name) {
      case "email":
        setFormValues((state) => ({ ...state, email: value }));
        setFormErrors((state) => ({ ...state, email: "" }));
        break;
      case "firstName":
        setFormValues((state) => ({ ...state, firstName: value }));
        setFormErrors((state) => ({ ...state, firstName: "" }));
        break;
      case "lastName":
        setFormValues((state) => ({ ...state, lastName: value }));
        setFormErrors((state) => ({ ...state, lastName: "" }));
        break;
      default:
        break;
    }
  };

  const onChangeSelect = (event: SelectChangeEvent): void => {
    setFormValues((state) => ({
      ...state,
      role: event.target.value,
    }));
    setFormErrors((state) => ({ ...state, role: "" }));
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    const defaultPassword: string = "12345";
    if (formValidation()) {
      const postUserValue: IUserFormPost = {
        role: formValues.role,
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        approval: "approved",
        password: defaultPassword,
      };

      await dispatch(usersRegister(postUserValue)).then((res) => {
        if (res.type === "users/register/fulfilled") {
          setFormValues((state) => ({
            ...state,
            role: "USER",
            email: "",
            firstName: "",
            lastName: "",
          }));

          setFormValues((state) => ({
            ...state,
            alert: {
              open: true,
              message: "User added. Password 12345",
              severity: "success",
            },
          }));
        } else {
          setFormValues((state) => ({
            ...state,
            alert: { open: true, message: res.payload, severity: "error" },
          }));
        }
      });
    }
  };

  const formValidation = (): boolean => {
    let valid = false;
    if (formValues.role === "")
      setFormErrors((state) => ({
        ...state,
        role: "Role is required.",
      }));
    if (formValues.email === "")
      setFormErrors((state) => ({
        ...state,
        email: "Email is required.",
      }));
    if (formValues.firstName === "")
      setFormErrors((state) => ({
        ...state,
        firstName: "First name is required.",
      }));
    if (formValues.lastName === "")
      setFormErrors((state) => ({
        ...state,
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
    setFormValues((state) => ({
      ...state,
      alert: { open: false, message: "", severity: "info" },
    }));
  };

  return (
    <UserAddForm
      formErrors={formErrors}
      formValues={formValues}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler}
      onChangeSelect={onChangeSelect}
      onClickCloseAlert={onClickCloseAlertHandler}
    />
  );
};

export default UserAdd;
