import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userMe } from "../../utilities/api";
import { isLogged } from "../../utilities/loggedIn";
import PublicNavBar from "./PublicNavbar";

const PublicLayout = () => {
  const [role, setRole] = React.useState<string>("USER");

  React.useEffect(() => {
    userMe().then((res) => {
      setRole(res.role);
    });
  }, []);

  return isLogged() && role === "ADMIN" ? (
    <Navigate to="/movies" replace />
  ) : (
    <React.Fragment>
      <PublicNavBar />
      <Outlet />
    </React.Fragment>
  );
};

export default PublicLayout;
