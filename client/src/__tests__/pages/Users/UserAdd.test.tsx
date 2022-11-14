import UserAdd from "../../../pages/Users/UserAdd";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupStore } from "../../../utilities/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const renderForm = () => {
  return render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <UserAdd />
      </BrowserRouter>
    </Provider>
  );
};

describe("<UserAdd />", () => {  
  test("Should render components in the forms.", () => {
    renderForm();

    const password: HTMLInputElement = screen.getByTestId("role");
    expect(password).toBeInTheDocument;

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
 
});
