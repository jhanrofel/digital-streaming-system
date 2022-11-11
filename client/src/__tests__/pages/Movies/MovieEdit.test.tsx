import MovieEdit from "../../../pages/Movies/MovieEdit";
import { fireEvent, render, screen } from "@testing-library/react";
import { setupStore } from "../../../utilities/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const renderForm = () => {
  return render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <MovieEdit />
      </BrowserRouter>
    </Provider>
  );
};

describe("<MovieEdit />", () => {  
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
    
    const backToList:HTMLButtonElement = screen.getByText("Back to List");    
    expect(backToList).toBeInTheDocument;
  });

  test("Should change input fields value onChange event.", () => {
    renderForm();

    const title: HTMLInputElement = screen.getByLabelText("Title");
    fireEvent.change(title, { target: { value: "Spider-Man Homecoming" } });
    expect(title.value).toBe("Spider-Man Homecoming");

    const cost: HTMLInputElement = screen.getByLabelText("Cost");
    fireEvent.change(cost, { target: { value: "25000000000" } });
    expect(cost.value).toBe("25000000000");

    const birthday: HTMLInputElement = screen.getByLabelText("Year Released");
    fireEvent.change(birthday, { target: { value: "2022" } });
    expect(birthday.value).toBe("2022");

    const catalogue: HTMLInputElement = screen.getByLabelText("Catalogue");
    fireEvent.change(catalogue, { target: { value: "new_url_movie_image_link" } });
    expect(catalogue.value).toBe("new_url_movie_image_link");

    const trailer: HTMLInputElement = screen.getByLabelText("Trailer");
    fireEvent.change(trailer, { target: { value: "new_url_movie_trailer_link" } });
    expect(trailer.value).toBe("new_url_movie_trailer_link");
  });

});
