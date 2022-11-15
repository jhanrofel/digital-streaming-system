import Register from "../../../pages/Register";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    
    const firstName: HTMLInputElement = screen.getByLabelText("First Name");
    userEvent.type(firstName, "Mike");
    expect(firstName.value).toBe("Mike");
    
    const lastName: HTMLInputElement = screen.getByLabelText("Last Name");
    userEvent.type(lastName, "Ross");
    expect(lastName.value).toBe("Ross");
    
    const email: HTMLInputElement = screen.getByLabelText("Email");
    userEvent.type(email, "mike.ross@mail.com");
    expect(email.value).toBe("mike.ross@mail.com");
    
    const password: HTMLInputElement = screen.getByLabelText("Password");
    userEvent.type(password, "mike@123");
    expect(password.value).toBe("mike@123");
    
    const confirm: HTMLInputElement = screen.getByLabelText("Confirm Password");
    userEvent.type(confirm, "mike@123");
    expect(confirm.value).toBe("mike@123");

  });    

  test("Should check validation on submit.", () => {
    renderForm();
    
    const button:HTMLButtonElement = screen.getByText("Create Account"); 
    userEvent.click(button);

    const firstNameRequired = screen.getAllByText("First name is required.");
    expect(firstNameRequired).toBeInTheDocument;

    const lastNameRequired = screen.getAllByText("Last name is required.");
    expect(lastNameRequired).toBeInTheDocument;

    const emailRequired = screen.getAllByText("Email is required.");
    expect(emailRequired).toBeInTheDocument;

    const passwordRequired = screen.getAllByText("Password is required.");
    expect(passwordRequired).toBeInTheDocument;

    const confirmRequired = screen.getAllByText("Confirm password is required.");
    expect(confirmRequired).toBeInTheDocument;
  });      

  test("Should check email on submit.", () => {
    renderForm();
    
    const firstName: HTMLInputElement = screen.getByLabelText("First Name");
    userEvent.type(firstName, "Mike");
    
    const lastName: HTMLInputElement = screen.getByLabelText("Last Name");
    userEvent.type(lastName, "Ross");
    
    const password: HTMLInputElement = screen.getByLabelText("Password");
    userEvent.type(password, "mike@123");
    
    const confirm: HTMLInputElement = screen.getByLabelText("Confirm Password");
    userEvent.type(confirm, "mike@123");
    
    const email: HTMLInputElement = screen.getByLabelText("Email");
    userEvent.type(email, "mike.ross");

    const button:HTMLButtonElement = screen.getByText("Create Account"); 
    userEvent.click(button);

    const confirmRequired = screen.getAllByText("Invalid email.");
    expect(confirmRequired).toBeInTheDocument;
  });  
});
