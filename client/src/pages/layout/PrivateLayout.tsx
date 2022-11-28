import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogged } from "../../utilities/loggedIn";
import { userMe } from "../../utilities/api";
import AdminNavBar from "./AdminNavBar";

const PrivateLayout: React.FC = () => {
  const [role, setRole] = React.useState<string>("ADMIN");

  React.useEffect(() => {
    userMe().then((res) => {
      setRole(res.users[0].role);
    });
  }, []);

  return isLogged() && role === "ADMIN" ? (
    <>
      <AdminNavBar /> <Outlet />
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateLayout;
