import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../utilities/hooks";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormButton from "../../components/FormButton";
import FormText from "../../components/FormText";
import { usersLogin } from "../../utilities/slice/userSlice";
import { cookiesCreate } from "../../utilities/cookies";

interface FormValue {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValue>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormValue>({
    email: "",
    password: "",
  });

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    switch (name) {
      case "email":
        setFormValues((state) => ({ ...state, email: value }));
        setFormErrors((state) => ({ ...state, email: "" }));
        break;
      case "password":
        setFormValues((state) => ({ ...state, password: value }));
        setFormErrors((state) => ({ ...state, password: "" }));
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
    if (formValues.password === "")
      setFormErrors((state) => ({
        ...state,
        password: "Password is required.",
      }));

    if (formValues.email !== "" && formValues.password !== "") {
      interface PostValue {
        email: string;
        password: string;
      }

      const postUserValue: PostValue = {
        email: formValues.email,
        password: formValues.password,
      };

      await dispatch(usersLogin(postUserValue)).then((res) => {
        if (res.type === "users/login/fulfilled") {
          console.log(res);
          cookiesCreate(res.payload.token);
          navigate("/");
        } else {
          alert(res.payload);
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#ffffff", display: "flex", flexWrap: "wrap" }}>
          <div className="form-header">SIGN IN</div>
          <FormText
            name="email"
            label="Email"
            type="search"
            error={formErrors.email}
            onChange={onChangeHandler}
          />
          <FormText
            name="password"
            label="Password"
            type="password"
            error={formErrors.password}
            onChange={onChangeHandler}
          />
          <FormButton label="Login" onClick={onClickSubmitHandler} />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Login;
