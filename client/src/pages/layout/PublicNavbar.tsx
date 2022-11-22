import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cookiesRemove, cookiesCreate } from "../../utilities/cookies";
import {
  isLogged,
  loggedInData,
  loggedInRemove,
  loggedInCreate,
} from "../../utilities/loggedIn";
import { userMe } from "../../utilities/api";
import { IUserLogin, IAlert } from "../../utilities/types";
import { userLogin, alertDataReset } from "../../utilities/formValues";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import FormButton from "../../components/FormButton";
import UserLogin from "../../components/User/UserLogin";
import SnackAlert from "../../components/SnackAlert";
import { useFormValidation, useAppDispatch } from "../../utilities/hooks";
import { usersLogin, usersData } from "../../utilities/slice/userSlice";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../utilities/muiStyle";

function PublicNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [search, setSearch] = React.useState<string>("");
  const onChangeHandlerSearch = (event: any): void => {
    let value = (event.target as HTMLInputElement).value;
    setSearch(value);
  };
  const onEnterKeyHandler = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.code === "Enter" && search !== "") {
      navigate("../search", { state: { search: search } });
    }
  };

  const [role, setRole] = React.useState<string>("USER");

  const [openUserForm, setOpenUserForm] = React.useState(false);

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

  React.useEffect(() => {
    if (isLogged()) {
      const fetchData = async () => {
        await userMe().then((res) => {
          setRole(res.user.role);
        });
      };

      fetchData().catch(console.error);
    }
  }, []);

  React.useEffect(() => {
    if (location.pathname === "/search") {
      setSearch(location.state?.search);
    } else {
      setSearch("");
    }
  }, [location]);

  const onClickLogoutHandler = (event: React.MouseEvent<HTMLElement>) => {
    loggedInRemove();
    cookiesRemove();
    navigate("/");
  };

  const onClickSignIn = () => {
    setOpenUserForm(true);
  };

  const onClickHandlerFormClose = () => {
    setOpenUserForm(false);
    resetForm();
    setDefaultValue(userLogin);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {location.pathname !== "/login" && location.pathname !== "/register" && (
            <Box
              sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={search}
                  onChange={onChangeHandlerSearch}
                  onKeyUpCapture={onEnterKeyHandler}
                />
              </Search>
            </Box>
          )}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/"
              sx={{ fontSize: 24 }}
            >
              {"DIGITAL STREAMING SYSTEM"}
            </Link>
          </Box>
          {isLogged() === 1 && (
            <Box sx={{ display: "flex", flexGrow: 0 }}>
              <Typography
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Hi! {loggedInData().firstName}
              </Typography>

              {isLogged() === 1 && role === "ADMIN" && (
                <Tooltip title={"Dashboard"}>
                  <IconButton
                    sx={{ p: 0 }}
                    onClick={() => navigate("/dashboard")}
                  >
                    <DashboardIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={"Logout"}>
                <IconButton sx={{ p: 0 }} onClick={onClickLogoutHandler}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {isLogged() === 0 && (
            <FormButton label="Sign In" onClick={onClickSignIn} />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <UserLogin
        openUserForm={openUserForm}
        formErrors={formErrors}
        defaultValue={defaultValue}
        onChange={onChangeHandler}
        onClickHandler={onClickHandler}
        onClickHandlerFormClose={onClickHandlerFormClose}
      />
      <SnackAlert
        alertData={alertData}
        onClickCloseAlert={onClickCloseAlertHandler}
      />
    </React.Fragment>
  );
}

export default PublicNavbar;
