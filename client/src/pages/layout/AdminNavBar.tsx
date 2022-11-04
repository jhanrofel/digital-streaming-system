import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../utilities/hooks";
import { cookiesRemove } from "../../utilities/cookies";
import { loggedInData, loggedInRemove } from "../../utilities/loggedIn";
import { clearUser } from "../../utilities/slice/userSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const pages = ["Movies", "Actors", "Users", "Reviews"];
const settings = [ "Dashboard", "Logout"];
const NavigationBar: React.FC = () => {
  const loggedIn = loggedInData();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    switch ((event.target as HTMLInputElement).innerText) {
      case "Logout":
        dispatch(clearUser());
        loggedInRemove();
        cookiesRemove();
        navigate("/");
        break;
      case "Dashboard":
        navigate("/dashboard");
        break;
      default:
        navigate("/dashboard");
        break;
    }
    setAnchorElUser(null);
  };

  const onClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    switch ((event.target as HTMLInputElement).textContent) {
      case "Movies":
        navigate("/movies");
        break;
      case "Actors":
        navigate("/actors");
        break;
      case "Users":
        navigate("/users");
        break;
      case "Reviews":
        navigate("/reviews");
        break;
      default:
        navigate("/dashboard");
        break;
    }
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO - DDS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={onClickMenu}
              >
                {page}
              </Button>
            ))}
          </Box>
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
              Hi! {loggedIn.firstName}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
