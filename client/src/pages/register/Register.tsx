import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../utilities/hooks";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormButton from "../../components/FormButton";
import FormText from "../../components/FormText";
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
        alert("Invalid email.");
        return;
      }
      if (formValues.password !== formValues.confirm) {
        alert("Confirm password does not match.");
        return;
      } else {
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
          console.log(res);
          if (res.type === "users/register/fulfilled") {
            alert(res.payload.message);
            navigate("/");
          } else {
            alert(res.payload);
          }
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#ffffff", display: "flex", flexWrap: "wrap" }}>
          <div className="form-header">REGISTRATION</div>
          <FormText
            name="email"
            label="Email"
            type="search"
            error={formErrors.email}
            onChange={onChangeHandler}
          />
          <FormText
            name="firstName"
            label="First Name"
            type="search"
            error={formErrors.firstName}
            onChange={onChangeHandler}
          />
          <FormText
            name="lastName"
            label="Last Name"
            type="search"
            error={formErrors.lastName}
            onChange={onChangeHandler}
          />
          <FormText
            name="password"
            label="Password"
            type="password"
            error={formErrors.password}
            onChange={onChangeHandler}
          />
          <FormText
            name="confirm"
            label="Confirm Password"
            type="password"
            error={formErrors.confirm}
            onChange={onChangeHandler}
          />
          <FormButton label="Create Account" onClick={onClickSubmitHandler} />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Register;
