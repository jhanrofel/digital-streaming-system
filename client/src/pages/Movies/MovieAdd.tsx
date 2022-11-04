import React from "react";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import MovieAddForm from "../../components/Movie/MovieAddForm";
import { SelectChangeEvent } from "@mui/material/Select";
import { actorsList } from "../../utilities/slice/actorSlice";
import { categoriesList } from "../../utilities/slice/categorySlice";
import { moviesPost } from "../../utilities/slice/movieSlice";

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

interface AlertData {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

const MovieAdd = () => {
  const dispatch = useAppDispatch();
  const [alertData, setAlertData] = React.useState<AlertData>({
    open: false,
    message: "",
    severity: "info",
  });
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

  React.useEffect(() => {
    dispatch(actorsList());
    dispatch(categoriesList());
  }, [dispatch]);

  const [formValues, setFormValues] = React.useState<FormValue>({
    title: "",
    cost: 0,
    yearReleased: 2022,
    comingSoon: "False",
    featured: "False",
    categories: [],
    banner: "",
    catalogue: "",
    facebook: "",
    instagram: "",
    youtube: "",
    trailer: "",
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
  }

  interface MovieLink {
    banner: string;
    catalogue: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    trailer?: string;
  }

  const onClickSubmitHandler = async (): Promise<void> => {
    const actorsValue = selectedActors.map((actor) => actor.id);
    const categoriesValue = selectedCategories.map((category) => category.id);
    if (formValidation()) {
      const postMovieValue: MovieDataOne = {
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
            banner: "",
            catalogue: "",
            facebook: "",
            instagram: "",
            youtube: "",
            trailer: "",
            categories: [],
            actors: [],
          }));
          setSelectedActors([]);
          setSelectedCategories([]);
          setAlertData({
            open: true,
            message: "Movie added.",
            severity: "success",
          });
        } else {
          setAlertData({ open: true, message: res.payload, severity: "error" });
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
    <MovieAddForm
      formErrors={formErrors}
      formValues={formValues}
      actorsOption={actorsOption}
      categoriesOption={categoriesOption}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler}
      onChangeSelect={onChangeSelect}
      onChangeActors={onChangeActors}
      onChangeCategories={onChangeCategories}
      alertData={alertData}
      setAlertData={setAlertData}
    />
  );
};

export default MovieAdd;
