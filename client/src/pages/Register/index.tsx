import React, { useState } from "react";
import {
  registerFormErrors,
  registerFormValues,
} from "../../utilities/formValues";
import { useAppDispatch } from "../../utilities/hooks";
import { usersRegister } from "../../utilities/slice/userSlice";
import {
  IRegisterFormErrors,
  IRegisterFormValues,
} from "../../utilities/types";
import RegistrationForm from "../../components/Register";

const Register = () => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] =
    useState<IRegisterFormValues>(registerFormValues);
  const [formErrors, setFormErrors] =
    useState<IRegisterFormErrors>(registerFormErrors);

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
      case "password":
        setFormValues((state) => ({ ...state, password: value }));
        setFormErrors((state) => ({ ...state, password: "" }));
        break;
      case "confirm":
        setFormValues((state) => ({ ...state, confirm: value }));
        setFormErrors((state) => ({ ...state, confirm: "" }));
        break;
      default:
        break;
    }
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    if (formValidation()) {
      interface PostValue {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }

      const postUserValue: PostValue = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
      };

      await dispatch(usersRegister(postUserValue)).then((res) => {
        if (res.type === "users/register/fulfilled") {
          setFormValues({
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirm: "",
            alert: {
              open: true,
              message: "Registration awaits in approval.",
              severity: "success",
            },
          });
        } else {
          setFormErrors((state) => ({
            ...state,
            email: res.payload,
          }));
        }
      });
    }
  };

  const formValidation = (): boolean => {
    let valid = false;
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
    if (formValues.password === ""){
      const fieldName: string = "password";
      setFormErrors((state) => ({
        ...state,
        [fieldName]: "Password is requried.",
      }));
    }
    
      
    if (formValues.confirm === "")
      setFormErrors((state) => ({
        ...state,
        confirm: "Confirm password is required.",
      }));

    if (
      formValues.email !== "" &&
      formValues.firstName !== "" &&
      formValues.lastName !== "" &&
      formValues.password !== "" &&
      formValues.confirm !== ""
    ) {
      /* email validation */
      const apos = formValues.email.indexOf("@");
      const dotpos = formValues.email.lastIndexOf(".");
      if (apos < 1 || dotpos - apos < 2) {
        setFormErrors((state) => ({
          ...state,
          email: "Invalid email.",
        }));
      } else if (formValues.password !== formValues.confirm) {
        setFormErrors((state) => ({
          ...state,
          confirm: "Confirm password does not match.",
        }));
      } else {
        valid = true;
      }
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
    <RegistrationForm
      formValues={formValues}
      formErrors={formErrors}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler}
      onClickCloseAlert={onClickCloseAlertHandler}
    />
  );
};

export default Register;
