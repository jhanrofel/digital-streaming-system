import MovieAdd from "../../../pages/Movies/MovieAdd";
import { fireEvent, render, screen } from "@testing-library/react";
import { setupStore } from "../../../utilities/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const renderForm = () => {
  return render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <MovieAdd />
      </BrowserRouter>
    </Provider>
  );
};

describe("<MovieAdd />", () => {  
  test("Should render components in the forms.", () => {
    renderForm();

    const title: HTMLInputElement = screen.getByTestId("title");
    expect(title).toBeInTheDocument;

    const cost: HTMLInputElement = screen.getByTestId("cost");
    expect(cost).toBeInTheDocument;
    
    const yearReleased: HTMLInputElement = screen.getByTestId("yearReleased");
    expect(yearReleased).toBeInTheDocument;
    
    const catalogue: HTMLInputElement = screen.getByTestId("catalogue");
    expect(catalogue).toBeInTheDocument;
    
    const trailer: HTMLInputElement = screen.getByTestId("trailer");
    expect(trailer).toBeInTheDocument;

    const save:HTMLButtonElement = screen.getByText("Save");    
    expect(save).toBeInTheDocument;
  });

  test("Should change input fields value onChange event.", () => {
    renderForm();
    const title: HTMLInputElement = screen.getByLabelText("Title");
    fireEvent.change(title, { target: { value: "Spider-Man No Way Home" } });
    expect(title.value).toBe("Spider-Man No Way Home");

    const cost: HTMLInputElement = screen.getByLabelText("Cost");
    fireEvent.change(cost, { target: { value: "2000000000000" } });
    expect(cost.value).toBe("2000000000000");

    const birthday: HTMLInputElement = screen.getByLabelText("Year Released");
    fireEvent.change(birthday, { target: { value: "2021" } });
    expect(birthday.value).toBe("2021");

    const catalogue: HTMLInputElement = screen.getByLabelText("Catalogue");
    fireEvent.change(catalogue, { target: { value: "url_movie_image_link" } });
    expect(catalogue.value).toBe("url_movie_image_link");

    const trailer: HTMLInputElement = screen.getByLabelText("Trailer");
    fireEvent.change(trailer, { target: { value: "url_movie_trailer_link" } });
    expect(trailer.value).toBe("url_movie_trailer_link");
  });

});
