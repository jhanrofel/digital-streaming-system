import React from "react";
import Container from "@mui/material/Container";
import {
  useAppDispatch,
  useAppSelector,
  useFormValidation,
} from "../../utilities/hooks";
import {
  moviesList,
  moviesDelete,
  clearSelected,
  moviesPost,
  moviesUpdate,
} from "../../utilities/slice/movieSlice";
import {
  IMovieData,
  IAlert,
  IAutoCompleteOption,
  IMovieDataPost,
  IObjectAny,
  IMovieForm,
} from "../../utilities/types";
import { alertDataReset, movieFormReset } from "../../utilities/formValues";
import DeleteDialogue from "../../components/Dialog/DeleteDialog";
import FormList from "../../components/FormList";
import FormHeader from "../../components/FormHeader";
import MovieForm from "../../components/Movie/MovieForm";
import SnackAlert from "../../components/SnackAlert";
import { actorsList } from "../../utilities/slice/actorSlice";
import MovieData from "./MovieData";

const Movies = () => {
  const dispatch = useAppDispatch();
  const movieSelected = useAppSelector((state) => state.movies.selected);
  const movie = useAppSelector((state) => state.movies.byId);
  const [defaultValue, setDefaultValue] =
    React.useState<IMovieForm>(movieFormReset);

  React.useEffect(() => {
    if (movie) {
      const movieActors = movie.movieActors.map((actor: any) => ({
        label: `${actor.firstName} ${actor.lastName}`,
        id: actor.id,
      }));

      const newValue = {
        title: movie.title,
        cost: movie.cost,
        featured: movie.featured ? "True" : "False",
        comingSoon: movie.comingSoon ? "True" : "False",
        yearReleased: movie.yearReleased,
        imageLink: movie.imageLink,
        trailerLink: movie.trailerLink,
        actors: movieActors,
      };

      setDefaultValue({ ...movieFormReset, ...newValue });

      setForm(newValue);
    } // eslint-disable-next-line
  }, [movie]);

  const onClickDeleteIcon = () => {
    setOpenDialogue(true);
  };

  const onClickEditIcon = () => {
    setTimeout(() => {
      setOpenMovieForm(true);
    }, 100);

    if (movie) {
      setDefaultValue({
        ...defaultValue,
        title: movie.title,
        cost: movie.cost,
        yearReleased: movie.yearReleased,
      });
    }
  };

  const { columns } = MovieData({
    callbackDelete: onClickDeleteIcon,
    callbackEdit: onClickEditIcon,
  });
  const rows: IMovieData[] = useAppSelector((state) => state.movies.list);
  React.useEffect(() => {
    dispatch(moviesList());
  }, [dispatch]);

  const onConfirmDelete = async () => {
    if (movieSelected) {
      await dispatch(moviesDelete(movieSelected)).then((res) => {
        if (res.type === "movies/delete/fulfilled") {
          setOpenDialogue(false);
        } else {
          setAlert({ open: true, message: res.payload, severity: "error" });
          setOpenDialogue(false);
        }
      });
    }
  };

  const onClickHandlerFormOpen = () => {
    setOpenMovieForm(true);
  };
  const headerButtons = [{ label: "Add", onClick: onClickHandlerFormOpen }];

  const [openMovieForm, setOpenMovieForm] = React.useState(false);

  const [openDialogue, setOpenDialogue] = React.useState<boolean>(false);

  const actors = useAppSelector((state) => state.actors.list);

  const actorsOption: IAutoCompleteOption[] = actors.map((actor) => ({
    label: `${actor.firstName} ${actor.lastName}`,
    id: actor.id ? actor.id : "",
  }));

  React.useEffect(() => {
    dispatch(actorsList());
  }, [dispatch]);

  const onClickSubmitHandler = async (
    formValues: IObjectAny
  ): Promise<void> => {
    const actorsValue = formValues.actors.map((actor: any) => actor.id);

    const postMovieValue: IMovieDataPost = {
      title: formValues.title,
      cost: parseInt(formValues.cost),
      yearReleased: parseInt(formValues.yearReleased),
      comingSoon: formValues.comingSoon === "True" ? true : false,
      featured: formValues.featured === "True" ? true : false,
      movieActors: actorsValue,
      imageLink: formValues.imageLink,
      trailerLink: formValues.trailerLink,
    };

    const dispatchResponse =
      movie && movie.id
        ? await dispatch(
            moviesUpdate({
              ...postMovieValue,
              id: movie.id,
            })
          )
        : await dispatch(moviesPost(postMovieValue));

    if (dispatchResponse.type === "movies/post/fulfilled") {
      resetForm();
      setOpenMovieForm(false);
      setAlert({
        open: true,
        message: `Movie added!`,
        severity: "success",
      });
    } else if (dispatchResponse.type === "movies/patch/fulfilled") {
      resetForm();
      setOpenMovieForm(false);
      setAlert({
        open: true,
        message: `Movie updated!`,
        severity: "success",
      });
    } else {
      setAlert({
        open: true,
        message: dispatchResponse.payload,
        severity: "error",
      });
    }
  };

  const [alertData, setAlert] = React.useState<IAlert>(alertDataReset);
  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    setAlert(alertDataReset);
  };

  const onClickHandlerFormClose = () => {
    setOpenMovieForm(false);
    resetForm();
    dispatch(clearSelected());
    setDefaultValue(movieFormReset);
  };

  const {
    onChangeHandler,
    onClickHandler,
    onChangeSelect,
    onChangeActors,
    formValues,
    formErrors,
    resetForm,
    setForm,
  } = useFormValidation({
    callback: onClickSubmitHandler,
    fieldsToValidate: ["title", "cost", "yearReleased", "imageLink", "actors"],
  });

  return (
    <React.Fragment>
      <Container sx={{ marginTop: 10 }}>
        <FormHeader header="MOVIES" buttons={headerButtons} />
        <FormList rows={rows} columns={columns} />
        <DeleteDialogue
          setOpen={setOpenDialogue}
          open={openDialogue}
          onConfirmDelete={onConfirmDelete}
        />
      </Container>
      <MovieForm
        openMovieForm={openMovieForm}
        formName={"AddForm"}
        formErrors={formErrors}
        formValues={formValues}
        defaultValue={defaultValue}
        actorsOption={actorsOption}
        onChangeHandler={onChangeHandler}
        onChangeSelect={onChangeSelect}
        onClickHandlerFormClose={onClickHandlerFormClose}
        onChangeActors={onChangeActors}
        onClickHandler={onClickHandler}
      />
      <SnackAlert
        alertData={alertData}
        onClickCloseAlert={onClickCloseAlertHandler}
      />
    </React.Fragment>
  );
};

export default Movies;
