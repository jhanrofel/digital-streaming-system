import Reviews from "../../../pages/Reviews";
import { render, screen } from "@testing-library/react";
import { setupStore } from "../../../utilities/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const renderForm = () => {
  return render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <Reviews />
      </BrowserRouter>
    </Provider>
  );
};

describe("<Reviews />", () => {
  test("Should render components in the forms.", () => {
    renderForm();

    const approval: HTMLInputElement = screen.getByLabelText("APPROVAL");
    expect(approval).toBeInTheDocument;

    const approved: HTMLInputElement = screen.getByLabelText("APPROVED");
    expect(approved).toBeInTheDocument;

    const disapproved: HTMLButtonElement = screen.getByLabelText("DISAPPROVED");
    expect(disapproved).toBeInTheDocument;
  });

  test("Should render components in Approved Tab.", () => {
    renderForm();

    const buttonApproved: HTMLButtonElement = screen.getByText("APPROVED");
    userEvent.click(buttonApproved);
    expect(buttonApproved).toBeInTheDocument;
  });

  test("Should render components in Disapproved Tab.", () => {
    renderForm();

    const buttonDisapproved: HTMLButtonElement =
      screen.getByText("DISAPPROVED");
    userEvent.click(buttonDisapproved);
    expect(buttonDisapproved).toBeInTheDocument;
  });
});
