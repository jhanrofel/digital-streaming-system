import Users from "../../../pages/Users";
import { render, screen } from "@testing-library/react";
import { setupStore } from "../../../utilities/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const renderForm = () => {
  return render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    </Provider>
  );
};

describe("<Users />", () => {
  test("Should render components in the forms.", () => {
    renderForm();

    const approval: HTMLInputElement = screen.getByLabelText("USERS");
    expect(approval).toBeInTheDocument;

    const approved: HTMLInputElement = screen.getByLabelText("ADD");
    expect(approved).toBeInTheDocument;

    const disapproved: HTMLButtonElement = screen.getByLabelText("APPROVAL");
    expect(disapproved).toBeInTheDocument;
  });

  test("Should render components in Approved Tab.", () => {
    renderForm();

    const buttonAdd: HTMLButtonElement = screen.getByText("ADD");
    userEvent.click(buttonAdd);
    expect(buttonAdd).toBeInTheDocument;
  });

  test("Should render components in Approval Tab.", () => {
    renderForm();

    const buttonApproval: HTMLButtonElement = screen.getByText("APPROVAL");      
    userEvent.click(buttonApproval);
    expect(buttonApproval).toBeInTheDocument;
  });
});
