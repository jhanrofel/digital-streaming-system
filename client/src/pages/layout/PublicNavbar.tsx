import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cookiesRemove } from "../../utilities/cookies";
import {
  isLogged,
  loggedInData,
  loggedInRemove,
} from "../../utilities/loggedIn";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

function PublicNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState<string>("");
  const onChangeHandler = (event: any): void => {
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
                  onChange={onChangeHandler}
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
              <Tooltip title="Logout">
                <IconButton sx={{ p: 0 }} onClick={onClickLogoutHandler}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {isLogged() === 0 && location.pathname === "/login" && (
            <Link variant="h6" underline="none" href="/register" sx={rightLink}>
              {"Register"}
            </Link>
          )}

          {isLogged() === 0 && location.pathname === "/register" && (
            <Link variant="h6" underline="none" href="/login" sx={rightLink}>
              {"Login"}
            </Link>
          )}

          {isLogged() === 0 && location.pathname === "/" && (
            <React.Fragment>
              <Link variant="h6" underline="none" href="/login" sx={rightLink}>
                {"Login"}
              </Link>
              <Link
                variant="h6"
                underline="none"
                href="/register"
                sx={rightLink}
              >
                {"Register"}
              </Link>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default PublicNavbar;
