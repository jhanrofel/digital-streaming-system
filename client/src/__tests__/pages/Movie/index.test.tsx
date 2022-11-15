import Movie from "../../../pages/Movies";
import { screen, cleanup } from "@testing-library/react";
import { renderWithProviders } from "../../../utilities/test-utils";
import { BrowserRouter } from "react-router-dom";
import { handlers } from "../../../mocks/handlers";
// import { mockMovieList } from "../../../mocks/actors.mocks";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

const server = setupServer(...handlers); // Enable API mocking before tests.

beforeAll(() => server.listen());

afterEach(cleanup);

const renderApp = () => {
  return renderWithProviders(
    <BrowserRouter>
      <Movie />
    </BrowserRouter>
  );
};

afterAll(() => server.close());

describe("<Movie />", () => {
  test("Should render components in the forms.", () => {
    renderApp();

    const header: HTMLInputElement = screen.getByText("MOVIES");
    expect(header).toBeInTheDocument;

    const button: HTMLButtonElement = screen.getByText("Add");
    expect(button).toBeInTheDocument;

    const title: HTMLInputElement = screen.getByLabelText("Title");
    expect(title).toBeInTheDocument;


    const cost: HTMLInputElement = screen.getByLabelText("Cost");
    expect(cost).toBeInTheDocument;

    const yearReleased: HTMLButtonElement = screen.getByLabelText("Year Released");
    expect(yearReleased).toBeInTheDocument;

  });

  test("Should render components actor form add on click.", () => {
    renderApp();

    const addButton: HTMLButtonElement = screen.getByText("Add");
    userEvent.click(addButton);

    const title: HTMLInputElement = screen.getByTestId("title");
    expect(title).toBeInTheDocument;

    const cost: HTMLInputElement = screen.getByTestId("cost");
    expect(cost).toBeInTheDocument;

    const yearReleased: HTMLInputElement = screen.getByTestId("yearReleased");
    expect(yearReleased).toBeInTheDocument;

    const imageLink: HTMLInputElement = screen.getByTestId("imageLink");
    expect(imageLink).toBeInTheDocument;

    const trailerLink: HTMLInputElement = screen.getByTestId("trailerLink");
    expect(trailerLink).toBeInTheDocument;
  });

  test("Should validate components actor form add on click.", () => {
    renderApp();

    const addButton: HTMLButtonElement = screen.getByText("Add");
    userEvent.click(addButton);

    const saveButton: HTMLButtonElement = screen.getByText("Save");
    userEvent.click(saveButton);

    const title = screen.getAllByText("Title is required.");
    expect(title).toBeInTheDocument;

    const cost = screen.getAllByText("Cost is required.");
    expect(cost).toBeInTheDocument;

    const yearReleased = screen.getAllByText("Year released is required.");
    expect(yearReleased).toBeInTheDocument;

    const imageLink = screen.getAllByText("Image link is required.");
    expect(imageLink).toBeInTheDocument;
  });

});
