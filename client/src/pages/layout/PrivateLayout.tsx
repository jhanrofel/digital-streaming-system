import { Navigate, Outlet } from "react-router-dom";
import { isLogged } from "../../utilities/loggedIn";
import AdminNavBar from "./AdminNavBar";

const PrivateLayout: React.FC = () => {
  return isLogged() ? (
    <>
      <AdminNavBar /> <Outlet />
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateLayout;
