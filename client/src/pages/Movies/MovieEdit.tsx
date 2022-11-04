import React from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import MovieEditForm from "../../components/Movie/MovieEditForm";
import { SelectChangeEvent } from "@mui/material/Select";
import { actorsList } from "../../utilities/slice/actorSlice";
import { categoriesList } from "../../utilities/slice/categorySlice";
import { moviesUpdate, moviesOne } from "../../utilities/slice/movieSlice";

interface FormValue {
  title: string;
  cost: number;
  yearReleased: number;
  comingSoon: string;
  featured: string;
  categories: OptionClass[];
  banner: string;
  catalogue: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  trailer?: string;
  actors: OptionClass[];
}

interface FormErrors {
  title: string;
  cost: string;
  yearReleased: string;
  banner: string;
  catalogue: string;
  actors: string;
}

interface OptionClass {
  label: string;
  id: string;
}

const MovieEdit = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const movieId = state;
  const movie = useAppSelector((state) => state.movies.dataGetOne);
  const actors = useAppSelector((state) => state.actors.data);
  const [selectedActors, setSelectedActors] = React.useState<
    Array<OptionClass>
  >([]);
  const categories = useAppSelector((state) => state.categories.data);
  const [selectedCategories, setSelectedCategories] = React.useState<
    Array<OptionClass>
  >([]);
  const actorsOption: OptionClass[] = actors.map((actor) => ({
    label: `${actor.firstName} ${actor.lastName}`,
    id: actor.id ? actor.id : "",
  }));
  const categoriesOption: OptionClass[] = categories.map((category) => ({
    label: category.name,
    id: category.id ? category.id : "",
  }));

  const [formValues, setFormValues] = React.useState<FormValue>({
    title: movie.title || "",
    cost: movie.cost || 0,
    yearReleased: movie.yearReleased || 2022,
    comingSoon: movie.comingSoon ? "True" : "False",
    featured: movie.featured ? "True" : "False",
    categories: [],
    banner: movie.movieLink?.banner || "",
    catalogue: movie.movieLink?.catalogue || "",
    facebook: movie.movieLink?.facebook || "",
    instagram: movie.movieLink?.instagram || "",
    youtube: movie.movieLink?.youtube || "",
    trailer: movie.movieLink?.trailer || "",
    actors: [],
  });
  const [formErrors, setFormErrors] = React.useState<FormErrors>({
    title: "",
    cost: "",
    yearReleased: "",
    banner: "",
    catalogue: "",
    actors: "",
  });

  React.useEffect(() => {
    dispatch(moviesOne(movieId));
    dispatch(actorsList());
    dispatch(categoriesList());
  }, [dispatch, movieId]);

  React.useEffect(() => {
    setFormValues((state) => ({
      ...state,
      title: movie.title || "",
      cost: movie.cost || 0,
      yearReleased: movie.yearReleased || 2022,
      comingSoon: movie.comingSoon ? "True" : "False",
      featured: movie.featured ? "True" : "False",
      categories: [],
      banner: movie.movieLink?.banner || "",
      catalogue: movie.movieLink?.catalogue || "",
      facebook: movie.movieLink?.facebook || "",
      instagram: movie.movieLink?.instagram || "",
      youtube: movie.movieLink?.youtube || "",
      trailer: movie.movieLink?.trailer || "",
      actors: [],
    }));
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
      const movieCategories: OptionClass[] = movie.categories.map(
        (categoryId: string) => {
          return categoriesOption.find(
            (category) => category.id === categoryId
          );
        }
      );

      setSelectedCategories(movieCategories);
    }
  }, [movie]);

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
      case "banner":
        setFormValues((state) => ({ ...state, banner: value }));
        setFormErrors((state) => ({ ...state, banner: "" }));
        break;
      case "catalogue":
        setFormValues((state) => ({ ...state, catalogue: value }));
        setFormErrors((state) => ({ ...state, catalogue: "" }));
        break;
      case "facebook":
        setFormValues((state) => ({ ...state, facebook: value }));
        break;
      case "instagram":
        setFormValues((state) => ({ ...state, instagram: value }));
        break;
      case "youtube":
        setFormValues((state) => ({ ...state, youtube: value }));
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

  interface MovieDataOne {
    id?: string;
    title: string;
    cost: number;
    yearReleased: number;
    comingSoon: boolean;
    featured: boolean;
    link?: string;
    actors: string[];
    categories: string[];
    movieLink: MovieLink;
    movieActors: MovieActors[];
  }

  interface MovieLink {
    banner: string;
    catalogue: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    trailer?: string;
  }

  interface MovieActors {
    id: string;
    firstName: string;
    lastName: string;
  }

  const onClickSubmitHandler = async (): Promise<void> => {
    const actorsValue = selectedActors.map((actor) => actor.id);
    const categoriesValue = selectedCategories.map((category) => category.id);
    if (formValidation()) {
      const postMovieValue: MovieDataOne = {
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
          banner: formValues.banner,
          catalogue: formValues.catalogue,
          facebook: formValues.facebook,
          instagram: formValues.instagram,
          youtube: formValues.youtube,
          trailer: formValues.trailer,
        },
        movieActors: [],
      };

      await dispatch(moviesUpdate(postMovieValue)).then((res) => {
        if (res.type === "movies/patch/fulfilled") {
          alert("Movie updated.");
        } else {
          alert(res.payload);
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

  React.useEffect(() => {
    setFormValues((state) => ({ ...state, actors: selectedActors }));
  }, [selectedActors]);

  const onChangeCategories = (
    event: React.FormEvent<HTMLInputElement>,
    newValue: any
  ) => {
    setSelectedCategories(newValue);
  };

  React.useEffect(() => {
    setFormValues((state) => ({ ...state, categories: selectedCategories }));
  }, [selectedCategories]);

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
    if (formValues.banner === "")
      setFormErrors((state) => ({
        ...state,
        banner: "Banner is required.",
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
      formValues.banner !== "" &&
      formValues.catalogue !== ""
    ) {
      valid = true;
    }

    return valid;
  };

  return (
    <MovieEditForm
      formErrors={formErrors}
      formValues={formValues}
      actorsOption={actorsOption}
      categoriesOption={categoriesOption}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler}
      onChangeSelect={onChangeSelect}
      onChangeActors={onChangeActors}
      onChangeCategories={onChangeCategories}
    />
  );
};

export default MovieEdit;
