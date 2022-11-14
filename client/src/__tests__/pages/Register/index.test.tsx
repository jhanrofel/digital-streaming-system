import Register from "../../../pages/Register";
import { fireEvent, render, screen } from "@testing-library/react";
import { setupStore } from "../../../utilities/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const renderForm = () => {
  return render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </Provider>
  );
};

describe("<Register />", () => {  
  test("Should render components in the forms.", () => {
    renderForm();

    const email: HTMLInputElement = screen.getByTestId("email");
    expect(email).toBeInTheDocument;

    const firstName: HTMLInputElement = screen.getByTestId("firstName");
    expect(firstName).toBeInTheDocument;

    const lastName: HTMLInputElement = screen.getByTestId("lastName");
    expect(lastName).toBeInTheDocument;

    const password: HTMLInputElement = screen.getByTestId("password");
    expect(password).toBeInTheDocument;

    const confirm: HTMLInputElement = screen.getByTestId("confirm");
    expect(confirm).toBeInTheDocument;

    const button:HTMLButtonElement = screen.getByText("Create Account");    
    expect(button).toBeInTheDocument;

    const header:HTMLInputElement = screen.getByText("REGISTRATION");    
    expect(header).toBeInTheDocument;
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
