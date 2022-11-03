import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../utilities/hooks";
import RegistrationForm from "../../components/register/Register";
import { usersRegister } from "../../utilities/slice/userSlice";

interface FormValue {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValue>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirm: "",
  });

  const [formErrors, setFormErrors] = useState<FormValue>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirm: "",
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
          alert(res.payload.message);
          navigate("/");
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
    if (formValues.password === "")
      setFormErrors((state) => ({
        ...state,
        password: "Password is required.",
      }));
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

  return (
    <RegistrationForm
      formErrors={formErrors}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler} 
    />
  );
};

export default Register;
