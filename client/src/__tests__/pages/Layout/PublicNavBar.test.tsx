import PublicNavbar from "../../../pages/Layout/PublicNavbar";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utilities/test-utils";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const renderApp = () => {
  return renderWithProviders(
    <BrowserRouter>
      <PublicNavbar />
    </BrowserRouter>
  );
};

describe("<PublicNavbar />", () => {
  test("Should render components", () => {
    renderApp();

    const search = screen.getByText("DIGITAL STREAMING SYSTEM");
    expect(search).toBeInTheDocument;

    const login = screen.getByText("Login");
    expect(login).toBeInTheDocument;

    const register = screen.getByText("Register");
    expect(register).toBeInTheDocument;
  });

  test("Should get navigation", () => {
    renderApp();

    const login: HTMLAnchorElement = screen.getByText("Login");
    expect(login.href).toEqual("http://localhost/login");

    const register: HTMLAnchorElement = screen.getByText("Register");
    expect(register.href).toEqual("http://localhost/register");
  });
});
