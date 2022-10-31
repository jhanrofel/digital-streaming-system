import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Box sx={{ flex: 1 }} />
            <div className="nav-title">DIGITAL STREAMING SYSTEM</div>
            <Box sx={{ flex: 1 }} />
            {location.pathname === "/login" ? (
              ""
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate("./login")}
              >
                Login
              </Button>
            )}
            {location.pathname === "/register" ? (
              ""
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate("./register")}
              >
                Register
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default NavigationBar;
