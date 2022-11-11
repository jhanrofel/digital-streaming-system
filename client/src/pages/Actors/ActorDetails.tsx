import React from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { getActorById, actorsMovies } from "../../utilities/slice/actorSlice";
import ActorDetailsForm from "../../components/Actor/ActorDetailsForm";

const ActorDetails = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const actorId = state;
  const actor = useAppSelector((stateActor) => stateActor.actors.byId);
  const actorMovies = useAppSelector(
    (stateMovies) => stateMovies.actors.movies
  );

  React.useEffect(() => {
    dispatch(getActorById(actorId));
    dispatch(actorsMovies(actorId));
  }, [dispatch, actorId]);

  return <ActorDetailsForm actor={actor} actorMovies={actorMovies} />;
};

export default ActorDetails;
