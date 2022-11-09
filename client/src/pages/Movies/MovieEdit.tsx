import React from "react";
import { useLocation } from "react-router-dom";
import { movieFormErrors, movieFormValues } from "../../utilities/formValues";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { actorsList } from "../../utilities/slice/actorSlice";
import { categoriesList } from "../../utilities/slice/categorySlice";
import { moviesUpdate, moviesOne } from "../../utilities/slice/movieSlice";
import {
  IAutoCompleteOption,
  IMovieFormErrors,
  IMovieFormValues,
  IMovieFormPatch,
} from "../../utilities/types";
import { SelectChangeEvent } from "@mui/material/Select";
import MovieEditForm from "../../components/Movie/MovieForm";

const MovieEdit = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const movieId = state;
  const movie = useAppSelector((stateMovie) => stateMovie.movies.dataGetOne);
  const actors = useAppSelector((stateActors) => stateActors.actors.data);
  const [selectedActors, setSelectedActors] = React.useState<
    Array<IAutoCompleteOption>
  >([]);
  const categories = useAppSelector(
    (stateCategories) => stateCategories.categories.data
  );
  const [selectedCategories, setSelectedCategories] = React.useState<
    Array<IAutoCompleteOption>
  >([]);
  const actorsOption: IAutoCompleteOption[] = actors.map((actor) => ({
    label: `${actor.firstName} ${actor.lastName}`,
    id: actor.id ? actor.id : "",
  }));
  const categoriesOption: IAutoCompleteOption[] = categories.map(
    (category) => ({
      label: category.name,
      id: category.id ? category.id : "",
    })
  );

  const [formErrors, setFormErrors] =
    React.useState<IMovieFormErrors>(movieFormErrors);
  const [formValues, setFormValues] =
    React.useState<IMovieFormValues>(movieFormValues);

  React.useEffect(() => {
    dispatch(moviesOne(movieId));
    dispatch(actorsList());
    dispatch(categoriesList());
  }, [dispatch, movieId]);

  React.useEffect(() => {
    if (movie && movie.movieLink) {
      setFormValues((stateForms) => ({
        ...stateForms,
        title: movie.title,
        cost: movie.cost,
        yearReleased: movie.yearReleased,
        comingSoon: movie.comingSoon ? "True" : "False",
        featured: movie.featured ? "True" : "False",
        categories: [],
        catalogue: movie.movieLink.catalogue,
        trailer: movie.movieLink.trailer,
        actors: [],
      }));
    }
  }, [movie]);

  React.useEffect(() => {
    if (movie.movieActors && movie.movieActors.length > 0) {
      const movieActors = movie.movieActors.map((actor: any) => ({
        label: `${actor.firstName} ${actor.lastName}`,
        id: actor.id,
      }));

      setSelectedActors(movieActors);
    }
  }, [movie]);

  React.useEffect(() => {
    if (
      movie.categories &&
      movie.categories.length > 0 &&
      categoriesOption.length > 0
    ) {
      const movieCategories: IAutoCompleteOption[] = movie.categories.map(
        (categoryId: string) => {
          return categoriesOption.find(
            (category) => category.id === categoryId
          );
        }
      );

      setSelectedCategories(movieCategories);
    } // eslint-disable-next-line
  }, [movie]);

  React.useEffect(() => {
    setFormValues((stateSelectedActors) => ({
      ...stateSelectedActors,
      actors: selectedActors,
    }));
  }, [selectedActors]);

  const onChangeCategories = (
    event: React.FormEvent<HTMLInputElement>,
    newValue: any
  ) => {
    setSelectedCategories(newValue);
  };

  React.useEffect(() => {
    setFormValues((stateSelectedCategories) => ({
      ...stateSelectedCategories,
      categories: selectedCategories,
    }));
  }, [selectedCategories]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    switch (name) {
      case "title":
        setFormValues((stateTitleForm) => ({
          ...stateTitleForm,
          title: value,
        }));
        setFormErrors((stateTitleError) => ({ ...stateTitleError, title: "" }));
        break;
      case "cost":
        setFormValues((stateCostForm) => ({
          ...stateCostForm,
          cost: parseInt(value),
        }));
        setFormErrors((stateCostError) => ({ ...stateCostError, cost: "" }));
        break;
      case "yearReleased":
        setFormValues((stateYearReleasedForm) => ({
          ...stateYearReleasedForm,
          yearReleased: parseInt(value),
        }));
        setFormErrors((stateYearReleasedForm) => ({
          ...stateYearReleasedForm,
          yearReleased: "",
        }));
        break;
      case "catalogue":
        setFormValues((stateCatalogueForm) => ({
          ...stateCatalogueForm,
          catalogue: value,
        }));
        setFormErrors((stateCatalogueError) => ({
          ...stateCatalogueError,
          catalogue: "",
        }));
        break;
      case "trailer":
        setFormValues((stateTrailerError) => ({
          ...stateTrailerError,
          trailer: value,
        }));
        break;
      default:
        break;
    }
  };

  const onChangeSelect = (event: SelectChangeEvent) => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    switch (name) {
      case "comingSoon":
        setFormValues((stateComingSoongForm) => ({
          ...stateComingSoongForm,
          comingSoon: value,
        }));
        break;
      case "featured":
        setFormValues((stateFeaturedForm) => ({
          ...stateFeaturedForm,
          featured: value,
        }));
        break;
      default:
        break;
    }
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    const actorsValue = selectedActors.map((actor) => actor.id);
    const categoriesValue = selectedCategories.map((category) => category.id);
    if (formValidation()) {
      const postMovieValue: IMovieFormPatch = {
        id: movieId,
        link: movie.link,
        title: formValues.title,
        cost: formValues.cost,
        yearReleased: formValues.yearReleased,
        comingSoon: formValues.comingSoon === "True" ? true : false,
        featured: formValues.featured === "True" ? true : false,
        actors: actorsValue,
        categories: categoriesValue,
        movieLink: {
          catalogue: formValues.catalogue,
          trailer: formValues.trailer,
        },
        movieActors: [],
      };

      await dispatch(moviesUpdate(postMovieValue)).then((res) => {
        if (res.type === "movies/patch/fulfilled") {
          setFormValues((stateFormAlertFulfilled) => ({
            ...stateFormAlertFulfilled,
            alert: {
              open: true,
              message: "Movie updated.",
              severity: "success",
            },
          }));
        } else {
          setFormValues((stateFormAlertReject) => ({
            ...stateFormAlertReject,
            alert: { open: true, message: res.payload, severity: "error" },
          }));
        }
      });
    }
  };

  const onChangeActors = (
    event: React.FormEvent<HTMLInputElement>,
    newValue: any
  ) => {
    setSelectedActors(newValue);
    setFormErrors((stateActorsError) => ({ ...stateActorsError, actors: "" }));
  };

  const formValidation = (): boolean => {
    let valid = false;
    if (formValues.title === "")
      setFormErrors((stateTitleError) => ({
        ...stateTitleError,
        title: "Title is required.",
      }));
    if (typeof formValues.cost !== "number" || formValues.cost <= 0)
      setFormErrors((stateCostError) => ({
        ...stateCostError,
        cost: "Cost is required.",
      }));
    if (formValues.yearReleased <= 0)
      setFormErrors((stateYearReleasedError) => ({
        ...stateYearReleasedError,
        gender: "Year released is required.",
      }));
    if (formValues.catalogue === "")
      setFormErrors((stateCatalogueError) => ({
        ...stateCatalogueError,
        catalogue: "Catalogue is required.",
      }));
    if (selectedActors.length === 0)
      setFormErrors((stateActorsError) => ({
        ...stateActorsError,
        actors: "Actors is required.",
      }));
    if (
      formValues.title !== "" &&
      formValues.cost > 0 &&
      formValues.yearReleased > 0 &&
      formValues.catalogue !== ""
    ) {
      valid = true;
    }

    return valid;
  };

  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    setFormValues((stateAlertForm) => ({
      ...stateAlertForm,
      alert: { open: false, message: "", severity: "info" },
    }));
  };

  return (
    <MovieEditForm
      formName={"EditForm"}
      formErrors={formErrors}
      formValues={formValues}
      actorsOption={actorsOption}
      categoriesOption={categoriesOption}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler}
      onChangeSelect={onChangeSelect}
      onChangeActors={onChangeActors}
      onChangeCategories={onChangeCategories}
      onClickCloseAlert={onClickCloseAlertHandler}
    />
  );
};

export default MovieEdit;
