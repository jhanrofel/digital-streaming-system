import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const PublicLayout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default PublicLayout;
