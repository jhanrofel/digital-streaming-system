import Login from "../../../pages/Login";
import { fireEvent, render, screen } from "@testing-library/react";
import { setupStore } from "../../../utilities/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const renderForm = () => {
  return render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

describe("<Login />", () => {  
  test("Should render components in the forms.", () => {
    renderForm();

    const email: HTMLInputElement = screen.getByTestId("email");
    expect(email).toBeInTheDocument;

    const password: HTMLInputElement = screen.getByTestId("password");
    expect(password).toBeInTheDocument;

    const button:HTMLButtonElement = screen.getByText("Login");    
    expect(button).toBeInTheDocument;
  });

  test("Should change input fields value onChange event.", () => {
    renderForm();
    
    const email: HTMLInputElement = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "john.doe@mail.com" } });
    expect(email.value).toBe("john.doe@mail.com");

    const password: HTMLInputElement = screen.getByLabelText("Password");
    fireEvent.change(password, { target: { value: "mypass12134" } });
    expect(password.value).toBe("mypass12134");
  });  
});
