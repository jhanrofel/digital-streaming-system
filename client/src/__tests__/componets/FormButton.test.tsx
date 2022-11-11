import FormButton from "../../components/FormButton";
import { fireEvent, render, screen } from "@testing-library/react";

interface FormValues {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const formValues: FormValues = {
  label: "Click Me",
  onClick: jest.fn(),
};

const renderForm = () => {
  return render(<FormButton label={formValues.label} onClick={formValues.onClick} />)
}

describe("<Button/>", () => {    
  test("Should find element text.", () => {
    renderForm();
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument;
  });

  test("Should find element button role.", () => {
    renderForm();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument;
  });

  test("Should call onclick successfully.", () => {
    renderForm();
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(formValues.onClick).toHaveBeenCalledTimes(1);
  });
});
