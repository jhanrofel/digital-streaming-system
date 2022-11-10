import Login from "../../../components/Login";
import {
  loginFormErrors,
  loginFormValues,
} from "../../../utilities/formValues";
import { ILoginFormErrors, ILoginFormValues } from "../../../utilities/types";
import { render, screen } from "@testing-library/react";

interface FormProps {
  formValues: ILoginFormValues;
  formErrors: ILoginFormErrors;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
}

const formPropsValues: FormProps = {
  formValues: loginFormValues,
  formErrors: loginFormErrors,
  onChange: jest.fn(),
  onClick: jest.fn(),
  onClickCloseAlert: jest.fn(),
};

const renderForm = () => {
  return render(
    <Login
      formValues={formPropsValues.formValues}
      formErrors={formPropsValues.formErrors}
      onChange={formPropsValues.onChange}
      onClick={formPropsValues.onClick}
      onClickCloseAlert={formPropsValues.onClickCloseAlert}
    />
  );
};

describe("<Login/>", () => {
  test("Should find element by data-testid.", () => {
    renderForm();
    const loginLabel = screen.getByText("Login");
    expect(loginLabel).toBeInTheDocument;
  });
});
