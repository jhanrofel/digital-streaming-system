import { Outlet } from "react-router-dom";
import PublicNavBar from "./PublicNavbar";

const PublicLayout = () => {
  return (
    <>
      <PublicNavBar />
      <Outlet />
    </>
  );
};

export default PublicLayout;
