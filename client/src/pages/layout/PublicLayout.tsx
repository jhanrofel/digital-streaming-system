import React from "react";
import {  Outlet } from "react-router-dom";
import PublicNavBar from "./PublicNavbar";

const PublicLayout = () => {
  return (
    <React.Fragment>
      <PublicNavBar />
      <Outlet />
    </React.Fragment>
  );
};

export default PublicLayout;
