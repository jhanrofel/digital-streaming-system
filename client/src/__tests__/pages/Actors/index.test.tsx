import Actor from "../../../pages/Actors";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../utilities/test-utils";
import { BrowserRouter } from "react-router-dom";
import { handlers } from "../../../mocks/handlers";
// import { mockActorList } from "../../../mocks/actors.mocks";
import { setupServer } from "msw/node";

const server = setupServer(...handlers); // Enable API mocking before tests.

beforeAll(() => server.listen());

afterEach(cleanup);

const renderApp = () => {
  return renderWithProviders(
    <BrowserRouter>
      <Actor />
    </BrowserRouter>
  );
};

afterAll(() => server.close());

describe("<Actor />", () => {
  test("Should render components in the forms.", () => {
    renderApp();

    const firstName: HTMLInputElement = screen.getByLabelText("First Name");
    expect(firstName).toBeInTheDocument;

    const lastName: HTMLInputElement = screen.getByLabelText("Last Name");
    expect(lastName).toBeInTheDocument;

    const gender: HTMLInputElement = screen.getByLabelText("Gender");
    expect(gender).toBeInTheDocument;

    const header = screen.getByText("ACTORS");
    expect(header).toBeInTheDocument;

    const addButton: HTMLInputElement = screen.getByText("Add");
    expect(addButton).toBeInTheDocument;
  });

  test("Should render components actor form add on click.", () => {
    renderApp();

    const addButton: HTMLButtonElement = screen.getByText("Add");
    userEvent.click(addButton);

    const firstName: HTMLInputElement = screen.getByTestId("firstName");
    expect(firstName).toBeInTheDocument;

    const lastName: HTMLInputElement = screen.getByTestId("lastName");
    expect(lastName).toBeInTheDocument;

    const birthday: HTMLInputElement = screen.getByLabelText("Birthday");
    expect(birthday).toBeInTheDocument;

    const imageLink: HTMLInputElement = screen.getByTestId("imageLink");
    expect(imageLink).toBeInTheDocument;
  });

  test("Should validate components actor form add on click.", () => {
    renderApp();

    const addButton: HTMLButtonElement = screen.getByText("Add");
    userEvent.click(addButton);

    const saveButton: HTMLButtonElement = screen.getByText("Save");
    userEvent.click(saveButton);

    const firstName = screen.getAllByText("First name is required.");
    expect(firstName).toBeInTheDocument;

    const lastname = screen.getAllByText("Last name is required.");
    expect(lastname).toBeInTheDocument;

    const gender = screen.getAllByText("Gender is required.");
    expect(gender).toBeInTheDocument;

    const imageLink = screen.getAllByText("Image link is required.");
    expect(imageLink).toBeInTheDocument;
  });
});
