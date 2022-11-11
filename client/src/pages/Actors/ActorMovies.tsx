import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { getActorById, actorsMovies } from "../../utilities/slice/actorSlice";
import ActorMoviesForm from "../../components/Actor/ActorMoviesForm";

const ActorMovies = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const actorId = state;
  const actor = useAppSelector((stateActor) => stateActor.actors.byId);
  const movies = useAppSelector((stateMovies) => stateMovies.actors.movies);

  useEffect(() => {
    dispatch(getActorById(actorId));
    dispatch(actorsMovies(actorId));
  }, [dispatch, actorId]);

  return <ActorMoviesForm actor={actor} movies={movies} />;
};

export default ActorMovies;
