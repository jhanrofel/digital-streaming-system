import React from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { actorsOne,actorsMovies } from "../../utilities/slice/actorSlice";
import ActorDetailsForm from "../../components/Actor/ActorDetailsForm";

const ActorsDetails = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const actorId = state;
  const actor = useAppSelector((state) => state.actors.dataOne);
  const actorMovies = useAppSelector((state) => state.actors.dataMovies);

  React.useEffect(() => {
    dispatch(actorsOne(actorId));
    dispatch(actorsMovies(actorId));
  }, [dispatch, actorId]);


  return (
    <ActorDetailsForm
      actor={actor}
      actorMovies={actorMovies}
    />
  );
};

export default ActorsDetails;
