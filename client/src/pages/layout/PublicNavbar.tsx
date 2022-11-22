import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cookiesRemove } from "../../utilities/cookies";
import {
  isLogged,
  loggedInData,
  loggedInRemove,
} from "../../utilities/loggedIn";
import { userMe } from "../../utilities/api";
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

function PublicNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
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

  const [openUserLoginForm, setOpenUserLoginForm] = React.useState(false);
  const [openUserRegisterForm, setOpenUserRegisterForm] = React.useState(false);

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
    setOpenUserLoginForm(true);
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
