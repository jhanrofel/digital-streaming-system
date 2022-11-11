import React from "react";
import { movieFormErrors, movieFormValues } from "../../utilities/formValues";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { actorsList } from "../../utilities/slice/actorSlice";
import { categoriesList } from "../../utilities/slice/categorySlice";
import { moviesPost } from "../../utilities/slice/movieSlice";
import {
  IAutoCompleteOption,
  IMovieFormErrors,
  IMovieFormValues,
  IMovieFormPost,
} from "../../utilities/types";
import { SelectChangeEvent } from "@mui/material/Select";
import MovieForm from "../../components/Movie/MovieForm";

const MovieAdd = () => {
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.actors.list);
  const [selectedActors, setSelectedActors] = React.useState<
    Array<IAutoCompleteOption>
  >([]);
  const categories = useAppSelector((state) => state.categories.data);
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
    dispatch(actorsList());
    dispatch(categoriesList());
  }, [dispatch]);

  React.useEffect(() => {
    setFormValues((state) => ({ ...state, actors: selectedActors }));
  }, [selectedActors]);

  React.useEffect(() => {
    setFormValues((state) => ({ ...state, categories: selectedCategories }));
  }, [selectedCategories]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    switch (name) {
      case "title":
        setFormValues((state) => ({ ...state, title: value }));
        setFormErrors((state) => ({ ...state, title: "" }));
        break;
      case "cost":
        setFormValues((state) => ({ ...state, cost: parseInt(value) }));
        setFormErrors((state) => ({ ...state, cost: "" }));
        break;
      case "yearReleased":
        setFormValues((state) => ({ ...state, yearReleased: parseInt(value) }));
        setFormErrors((state) => ({ ...state, yearReleased: "" }));
        break;
      case "catalogue":
        setFormValues((state) => ({ ...state, catalogue: value }));
        setFormErrors((state) => ({ ...state, catalogue: "" }));
        break;
      case "trailer":
        setFormValues((state) => ({ ...state, trailer: value }));
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
        setFormValues((state) => ({
          ...state,
          comingSoon: value,
        }));
        break;
      case "featured":
        setFormValues((state) => ({
          ...state,
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
      const postMovieValue: IMovieFormPost = {
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
      };

      await dispatch(moviesPost(postMovieValue)).then((res) => {
        if (res.type === "movies/post/fulfilled") {
          setFormValues((state) => ({
            ...state,
            title: "",
            cost: 0,
            yearReleased: 2022,
            comingSoon: "False",
            featured: "False",
            catalogue: "",
            facebook: "",
            instagram: "",
            youtube: "",
            trailer: "",
            categories: [],
            actors: [],
            alert: {
              open: true,
              message: "Movie added.",
              severity: "success",
            },
          }));
          setSelectedActors([]);
          setSelectedCategories([]);
        } else {
          setFormValues((state) => ({
            ...state,
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
    setFormErrors((state) => ({ ...state, actors: "" }));
  };

  const onChangeCategories = (
    event: React.FormEvent<HTMLInputElement>,
    newValue: any
  ) => {
    setSelectedCategories(newValue);
  };

  const formValidation = (): boolean => {
    let valid = false;
    if (formValues.title === "")
      setFormErrors((state) => ({
        ...state,
        title: "Title is required.",
      }));
    if (typeof formValues.cost !== "number" || formValues.cost <= 0)
      setFormErrors((state) => ({
        ...state,
        cost: "Cost is required.",
      }));
    if (formValues.yearReleased <= 0)
      setFormErrors((state) => ({
        ...state,
        gender: "Year released is required.",
      }));
    if (formValues.catalogue === "")
      setFormErrors((state) => ({
        ...state,
        catalogue: "Catalogue is required.",
      }));
    if (selectedActors.length === 0)
      setFormErrors((state) => ({
        ...state,
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
    setFormValues((state) => ({
      ...state,
      alert: { open: false, message: "", severity: "info" },
    }));
  };

  return (
    <MovieForm
      formName={"AddForm"}
      formValues={formValues}
      formErrors={formErrors}
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

export default MovieAdd;
