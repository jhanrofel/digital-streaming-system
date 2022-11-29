import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cookiesRemove } from "../../utilities/cookies";
import { isLogged, loggedInRemove } from "../../utilities/loggedIn";
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
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../utilities/muiStyle";
import UserLogin from "../Users/UserLogin";
import UserRegister from "../Users/UserRegister";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { menuHiUser } from "../../utilities/muiStyle";
import { clearReviews } from "../../utilities/slice/reviewSlice";
import { clearUser, usersMe } from "../../utilities/slice/userSlice";

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

  const currentUser = useAppSelector((state) => state.users.logged);
  const [openUserLoginForm, setOpenUserLoginForm] = React.useState(false);
  const [openUserRegisterForm, setOpenUserRegisterForm] = React.useState(false);

  React.useEffect(() => {
    if (isLogged()) {
      dispatch(usersMe());
    } // eslint-disable-next-line
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
    dispatch(clearReviews());
    dispatch(clearUser());
    navigate("/");
  };

  const onClickSignIn = () => {
    setOpenUserLoginForm(true);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
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
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              sx={{ fontSize: 24 }}
              onClick={() => navigate("/")}
            >
              {"DIGITAL STREAMING SYSTEM"}
            </Link>
          </Box>
          <Box sx={{ display: "flex", flexGrow: 0 }}>
            {currentUser && (
              <Typography
                sx={menuHiUser}
              >{`Hi! ${currentUser.firstName}`}</Typography>
            )}

            {currentUser?.role === "ADMIN" && (
              <Tooltip title={"Dashboard"}>
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => navigate("/dashboard")}
                >
                  <DashboardIcon />
                </IconButton>
              </Tooltip>
            )}

            {currentUser && (
              <Tooltip title={"Logout"}>
                <IconButton sx={{ p: 0 }} onClick={onClickLogoutHandler}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {!currentUser && (
            <FormButton label="Sign In" onClick={onClickSignIn} />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <UserLogin
        openUserForm={openUserLoginForm}
        setOpenUserForm={setOpenUserLoginForm}
        setOpenUserRegisterForm={setOpenUserRegisterForm}
      />
      <UserRegister
        openUserForm={openUserRegisterForm}
        setOpenUserForm={setOpenUserRegisterForm}
      />
    </React.Fragment>
  );
}

export default PublicNavbar;
