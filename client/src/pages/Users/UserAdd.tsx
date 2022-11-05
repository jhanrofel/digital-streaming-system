import React from "react";
import { useAppDispatch } from "../../utilities/hooks";
import UserAddForm from "../../components/User/UserAddForm";
import { SelectChangeEvent } from "@mui/material/Select";
import { usersRegister } from "../../utilities/slice/userSlice";

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

const UserAdd = () => {
  const dispatch = useAppDispatch();
  const [alertData, setAlertData] = React.useState<AlertData>({
    open: false,
    message: "",
    severity: "info",
  });

  const [formValues, setFormValues] = React.useState<FormValue>({
    role: "USER",
    email: "",
    firstName: "",
    lastName: "",
  });

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
    id?: string;
    role: string;
    email: string;
    firstName: string;
    lastName: string;
    approval: string;
    password: string;
  }

  const onClickSubmitHandler = async (): Promise<void> => {
    if (formValidation()) {
      const postUserValue: UserDataOne = {
        role: formValues.role,
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        approval: "approved",
        password: "12345",
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
          setAlertData({
            open: true,
            message: `User added. Password 12345`,
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

  return (
    <UserAddForm
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

export default UserAdd;
