import UserEdit from "../../../pages/Users/UserEdit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupStore } from "../../../utilities/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const renderForm = () => {
  return render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <UserEdit />
      </BrowserRouter>
    </Provider>
  );
};

describe("<UserEdit />", () => {  
  test("Should render components in the forms.", () => {
    renderForm();

    const role: HTMLInputElement = screen.getByTestId("role");
    expect(role).toBeInTheDocument;

    const email: HTMLInputElement = screen.getByTestId("email");
    expect(email).toBeInTheDocument;

    const firstName: HTMLInputElement = screen.getByTestId("firstName");
    expect(firstName).toBeInTheDocument;

    const lastName: HTMLInputElement = screen.getByTestId("lastName");
    expect(lastName).toBeInTheDocument;
  });

  test("Should change input fields value onChange event.", () => {
    renderForm();    
        
    const emailAddUser: HTMLInputElement = screen.getByLabelText("Email");
    userEvent.type(emailAddUser, "anne@mail.com");
    expect(emailAddUser.value).toBe("anne@mail.com");
    
    const firstName: HTMLInputElement = screen.getByLabelText("First Name");
    userEvent.type(firstName, "Anne");
    expect(firstName.value).toBe("Anne");
    
    const password: HTMLInputElement = screen.getByLabelText("Last Name");
    userEvent.type(password, "Hunter");
    expect(password.value).toBe("Hunter");
  });    
 

  test("Should check validation on submit.", () => {
    renderForm();
    
    const button:HTMLButtonElement = screen.getByText("Save"); 
    userEvent.click(button);

    const firstNameRequired = screen.getByText("First name is required.");
    expect(firstNameRequired).toBeInTheDocument;

    const lastNameRequired = screen.getByText("Last name is required.");
    expect(lastNameRequired).toBeInTheDocument;

    const emailRequired = screen.getByText("Email is required.");
    expect(emailRequired).toBeInTheDocument;

  });  
});
