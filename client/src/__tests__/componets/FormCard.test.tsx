import FormCard from "../../components/FormCard";
import { render, screen } from "@testing-library/react";

interface FormValues {
  title: string;
  link: string;
}

const formValues: FormValues = {
  title: "GOOGLE",
  link: "https://www.google.com/",
};

const renderForm = () => {
  return render(<FormCard title={formValues.title} link={formValues.link} />);
}

describe("<FormCard/>", () => {
  test("Should find element by alt text.", () => {
    renderForm();
    const cardMedia = screen.getByAltText("GOOGLE");
    expect(cardMedia).toBeInTheDocument;
  });

  test("Should to have a property of height that is equal to 300 .", () => {
    renderForm();
    const cardMedia = screen.getByAltText("GOOGLE");
    expect(cardMedia).toHaveProperty("height", 300);
  });

  test("Should to have a property of img that is equal to link value .", () => {
    renderForm();
    const cardMedia = screen.getByAltText("GOOGLE");
    expect(cardMedia).toHaveProperty("alt", formValues.title);
  });

  test("Should to have a property of source equal to link value .", () => {
    renderForm();
    const cardMedia = screen.getByAltText("GOOGLE");
    expect(cardMedia).toHaveProperty("src", formValues.link);
  });

  test("Should find element by text.", () => {
    renderForm();
    const cardContent = screen.getByText("GOOGLE");
    expect(cardContent).toBeInTheDocument;
  });

  test("Should find form card content text equal to text.", () => {
    renderForm();
    const cardContent = screen.getByText("GOOGLE");
    expect(cardContent.textContent).toEqual(formValues.title);
  });
});
