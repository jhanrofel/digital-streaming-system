import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
        <AppBar position="static" color="transparent">
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
    </div>
  );
};

export default NavigationBar;
