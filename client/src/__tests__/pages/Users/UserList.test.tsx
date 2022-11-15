import UserList from "../../../pages/Users/UserList";
import { render, screen } from "@testing-library/react";
import { setupStore } from "../../../utilities/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const renderForm = () => {
  return render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    </Provider>
  );
};

describe("<UserList />", () => {  
  test("Should initial render no data.", () => {
    renderForm();

    const email: HTMLInputElement = screen.getByText("No rows");
    expect(email).toBeInTheDocument;
  });
 

  test("Should call click event.", () => {
    renderForm();

    const email: HTMLInputElement = screen.getByText("No rows");
    expect(email).toBeInTheDocument;
  });
 

});
