import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../../components/AppBar";
import Toolbar from "../../components/Toolbar";
import { useLocation } from "react-router-dom";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  const location = useLocation();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {"DIGITAL STREAMING SYSTEM"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {location.pathname === "/login" ? (
              ""
            ) : (
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                href="/login"
                sx={rightLink}
              >
                {"Login"}
              </Link>
            )}

            {location.pathname === "/register" ? (
              ""
            ) : (
              <Link
                variant="h6"
                underline="none"
                href="/register"
                sx={rightLink}
              >
                {"Register"}
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
