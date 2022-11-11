import ActorAdd from "../../../pages/Actors/ActorAdd";
import { fireEvent, render, screen } from "@testing-library/react";
import { setupStore } from "../../../utilities/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const renderForm = () => {
  return render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <ActorAdd />
      </BrowserRouter>
    </Provider>
  );
};

describe("<ActorAdd />", () => {  
  test("Should render components in the forms.", () => {
    renderForm();

    const firstName: HTMLInputElement = screen.getByTestId("firstName");
    expect(firstName).toBeInTheDocument;

    const lastName: HTMLInputElement = screen.getByTestId("lastName");
    expect(lastName).toBeInTheDocument;
    
    const gender: HTMLInputElement = screen.getByTestId("gender");
    expect(gender).toBeInTheDocument;
    
    const birthday: HTMLInputElement = screen.getByLabelText("Birthday");
    expect(birthday).toBeInTheDocument;
    
    const catalogue: HTMLInputElement = screen.getByTestId("catalogue");
    expect(catalogue).toBeInTheDocument;

    const button:HTMLButtonElement = screen.getByText("Save");    
    expect(button).toBeInTheDocument;
  });

  test("Should change input fields value onChange event.", () => {
    renderForm();
    const firstName: HTMLInputElement = screen.getByLabelText("First Name");
    fireEvent.change(firstName, { target: { value: "John" } });
    expect(firstName.value).toBe("John");

    const lastName: HTMLInputElement = screen.getByLabelText("Last Name");
    fireEvent.change(lastName, { target: { value: "Doe" } });
    expect(lastName.value).toBe("Doe");

    const birthday: HTMLInputElement = screen.getByLabelText("Birthday");
    fireEvent.change(birthday, { target: { value: "01/01/2000" } });
    expect(birthday.value).toBe("01/01/2000");

    const catalogue: HTMLInputElement = screen.getByLabelText("Catalogue");
    fireEvent.change(catalogue, { target: { value: "url_link" } });
    expect(catalogue.value).toBe("url_link");
  });

});
