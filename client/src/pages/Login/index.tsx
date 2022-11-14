import React from "react";
import { useNavigate } from "react-router-dom";
import { cookiesCreate } from "../../utilities/cookies";
import { loginFormErrors, loginFormValues } from "../../utilities/formValues";
import { useAppDispatch } from "../../utilities/hooks";
import { loggedInCreate } from "../../utilities/loggedIn";
import { usersData, usersLogin } from "../../utilities/slice/userSlice";
import { ILoginFormErrors, ILoginFormValues } from "../../utilities/types";
import LoginForm from "../../components/Login";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] =
    React.useState<ILoginFormErrors>(loginFormErrors);
  const [formValues, setFormValues] =
    React.useState<ILoginFormValues>(loginFormValues);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    switch (name) {
      case "email":
        setFormValues((state) => ({ ...state, email: value }));
        setFormErrors((state) => ({
          ...state,
          [name]: value ? "" : "Email is required",
        }));
        break;
      case "password":
        setFormValues((state) => ({ ...state, password: value }));
        setFormErrors((state) => ({
          ...state,
          [name]: value ? "" : "Password is required",
        }));
        break;
      default:
        break;
    }
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    if (formValidation()) {
      const postUserValue: ILoginFormErrors = {
        email: formValues.email,
        password: formValues.password,
      };

      await dispatch(usersLogin(postUserValue)).then((res) => {
        if (res.type === "users/login/fulfilled") {
          cookiesCreate(res.payload);
          checkUserRole();
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
    if (formValues.email === "")
      setFormErrors((state) => ({
        ...state,
        email: "Email is required.",
      }));

    if (formValues.password === "") {
      const fieldName: string = "password";
      setFormErrors((state) => ({
        ...state,
        [fieldName]: "Password is required.",
      }));
    }

    if (formValues.email !== "" && formValues.password !== "") {
      valid = true;
    }

    return valid;
  };

  const checkUserRole = async (): Promise<void> => {
    await dispatch(usersData()).then((res) => {
      if (res.type === "users/me/fulfilled") {
        loggedInCreate(res.payload.user);
        if (res.payload.user.role === "ADMIN") {
          navigate("/movies");
        } else {
          navigate("/");
        }
      } else {
        setFormValues((state) => ({
          ...state,
          alert: { open: true, message: res.payload, severity: "error" },
        }));
      }
    });
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
    <LoginForm
      formValues={formValues}
      formErrors={formErrors}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler}
      onClickCloseAlert={onClickCloseAlertHandler}
    />
  );
};

export default Login;
