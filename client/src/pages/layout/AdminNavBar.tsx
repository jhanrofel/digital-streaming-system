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
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearCategories } from "../../utilities/slice/categorySlice";
import { clearActor } from "../../utilities/slice/actorSlice";
import { clearMovies } from "../../utilities/slice/movieSlice";
import { clearReviews } from "../../utilities/slice/reviewSlice";

const pages = ["Movies", "Actors", "Users", "Reviews"];
const AdminNavBar: React.FC = () => {
  const loggedIn = loggedInData();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClickLogoutHandler = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(clearActor());
    dispatch(clearCategories());
    dispatch(clearMovies());
    dispatch(clearReviews());
    dispatch(clearUser());
    loggedInRemove();
    cookiesRemove();
    navigate("/");
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
            DSS
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
              <Tooltip title="Logout">
                <IconButton sx={{ p: 0 }} onClick={onClickLogoutHandler}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminNavBar;
