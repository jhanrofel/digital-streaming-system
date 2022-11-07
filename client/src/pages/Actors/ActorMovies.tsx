import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { actorsOne, actorsMovies } from "../../utilities/slice/actorSlice";
import ActorMoviesForm from "../../components/Actor/ActorMoviesForm";

const ActorMovies = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const actorId = state;
  const actor = useAppSelector((stateActor) => stateActor.actors.dataOne);
  const movies = useAppSelector((stateMovies) => stateMovies.actors.dataMovies);

  useEffect(() => {
    dispatch(actorsOne(actorId));
    dispatch(actorsMovies(actorId));
  }, [dispatch, actorId]);

  return <ActorMoviesForm actor={actor} movies={movies} />;
};

export default ActorMovies;
