import Register from "../../../components/Register";
import {
  registerFormErrors,
  registerFormValues,
} from "../../../utilities/formValues";
import { IRegisterFormErrors, IRegisterFormValues } from "../../../utilities/types";
import { render, screen } from "@testing-library/react";

interface FormProps {
  formValues: IRegisterFormValues;
  formErrors: IRegisterFormErrors;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
}

const formPropsValues: FormProps = {
  formValues: registerFormValues,
  formErrors: registerFormErrors,
  onChange: jest.fn(),
  onClick: jest.fn(),
  onClickCloseAlert: jest.fn(),
};

const renderForm = () => {
  return render(
    <Register
      formValues={formPropsValues.formValues}
      formErrors={formPropsValues.formErrors}
      onChange={formPropsValues.onChange}
      onClick={formPropsValues.onClick}
      onClickCloseAlert={formPropsValues.onClickCloseAlert}
    />
  );
};

describe("<Register/>", () => {
  test("Should find element by text.", () => {
    renderForm();
    const registerLabel = screen.getByText("REGISTRATION");
    expect(registerLabel).toBeInTheDocument;
  });
  
});
