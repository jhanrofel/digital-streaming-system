import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import UserEditForm from "../../components/User/UserEditForm";
import { SelectChangeEvent } from "@mui/material/Select";
import { usersOne, usersUpdate } from "../../utilities/slice/userSlice";

interface FormValue {
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

const UserEdit = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const userId = state;
  const user = useAppSelector((state) => state.users.dataOne);
  const [alertData, setAlertData] = React.useState<AlertData>({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    dispatch(usersOne(userId));
  }, [dispatch, userId]);

  const [formValues, setFormValues] = React.useState<FormValue>({
    role: user.role || "USER",
    email: user.email || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  });

  useEffect(() => {
    setFormValues((state) => ({
      ...state,
      role: user.role || "",
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    }));
  }, [user]);

  const [formErrors, setFormErrors] = React.useState<FormValue>({
    role: "",
    email: "",
    firstName: "",
    lastName: "",
  });

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

  const onChangeSelect = (event: SelectChangeEvent) => {
    setFormValues((state) => ({
      ...state,
      role: event.target.value,
    }));
    setFormErrors((state) => ({ ...state, role: "" }));
  };

  interface UserDataOne {
    id: string;
    role: string;
    email: string;
    firstName: string;
    lastName: string;
  }

  const onClickSubmitHandler = async (): Promise<void> => {
    if (formValidation()) {
      const postUserValue: UserDataOne = {
        id: userId,
        role: formValues.role,
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
      };

      await dispatch(usersUpdate(postUserValue)).then((res) => {
        if (res.type === "users/update/fulfilled") {
          setAlertData({
            open: true,
            message: `Users updated.`,
            severity: "success",
          });
        } else {
          setAlertData({ open: true, message: res.payload, severity: "error" });
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

  return (
    <UserEditForm
      formErrors={formErrors}
      formValues={formValues}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler}
      onChangeSelect={onChangeSelect}
      alertData={alertData}
      setAlertData={setAlertData}
    />
  );
};

export default UserEdit;
