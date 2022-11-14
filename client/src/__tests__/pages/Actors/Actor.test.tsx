import Actor from "../../../pages/Actors";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../utilities/test-utils";
import { BrowserRouter } from "react-router-dom";
import { handlers } from "../../../mocks/handlers";
import { mockActorList } from "../../../mocks/actors.mocks";
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
  test("should render mock actors list", async () => {
    const { store } = renderApp();

    console.log(store.getState().actors);

    expect(store.getState().actors.list.length).toEqual(mockActorList.length);
  });


  test("Should render components in the forms.", () => {
    renderApp();

    const firstName: HTMLInputElement = screen.getByLabelText("First Name");
    expect(firstName).toBeInTheDocument;

    const lastName: HTMLInputElement = screen.getByLabelText("Last Name");
    expect(lastName).toBeInTheDocument;

    const gender: HTMLInputElement = screen.getByLabelText("Gender");
    expect(gender).toBeInTheDocument;
  });
});
