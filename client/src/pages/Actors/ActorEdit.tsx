import React from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { actorsOne, actorsUpdate } from "../../utilities/slice/actorSlice";
import {
  IActorFormErrors,
  IActorFormValues,
  IActorFormPost,
} from "../../utilities/types";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";
import ActorForm from "../../components/Actor/ActorForm";

const ActorEdit = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const actorId = state;
  const actor = useAppSelector((stateActor) => stateActor.actors.dataOne);
  const [birthday, setBirthday] = React.useState<Dayjs | null>(null);
  const [formValues, setFormValues] = React.useState<IActorFormValues>({
    firstName: actor.firstName || "",
    lastName: actor.lastName || "",
    gender: actor.gender || "",
    link: actor.link || "",
    catalogue: "",
    alert: {
      open: false,
      message: "",
      severity: "info",
    },
  });
  const [formErrors, setFormErrors] = React.useState<IActorFormErrors>({
    firstName: "",
    lastName: "",
    gender: "",
    birthday: "",
    catalogue: "",
  });

  React.useEffect(() => {
    formErrors.birthday = ""; // eslint-disable-next-line
  }, [birthday]);

  React.useEffect(() => {
    dispatch(actorsOne(actorId));
  }, [dispatch, actorId]);

  React.useEffect(() => {
    setFormValues((stateForm) => ({
      ...stateForm,
      firstName: actor.firstName || "",
      lastName: actor.lastName || "",
      gender: actor.gender || "",
      link: actor.link || "",
      catalogue: actor.actorLink ? actor.actorLink.catalogue : "",
    }));

    setBirthday(dayjs(actor.birthday));
  }, [actor]);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    switch (name) {
      case "firstName":
        setFormValues((stateFirstNameForm) => ({
          ...stateFirstNameForm,
          firstName: value,
        }));
        setFormErrors((stateFirstNameError) => ({
          ...stateFirstNameError,
          firstName: "",
        }));
        break;
      case "lastName":
        setFormValues((stateLastNameForm) => ({
          ...stateLastNameForm,
          lastName: value,
        }));
        setFormErrors((stateLastNameError) => ({
          ...stateLastNameError,
          lastName: "",
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
      default:
        break;
    }
  };

  const onChangeSelect = (event: SelectChangeEvent) => {
    setFormValues((stateOnChange) => ({
      ...stateOnChange,
      gender: event.target.value,
    }));
    setFormErrors((stateGenderError) => ({ ...stateGenderError, gender: "" }));
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    if (formValidation()) {
      const postUserValue: IActorFormPost = {
        id: actorId,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        gender: formValues.gender,
        birthday: birthday ? birthday.toString() : "",
        link: formValues.link,
        actorLink: {
          catalogue: formValues.catalogue,
        },
      };

      const actorGender = formValues.gender === "Male" ? "Actor" : "Actress";

      await dispatch(actorsUpdate(postUserValue)).then((res) => {
        if (res.type === "actors/update/fulfilled") {
          setFormValues((stateAlertFulfill) => ({
            ...stateAlertFulfill,
            alert: {
              open: true,
              message: `${actorGender} updated.`,
              severity: "success",
            },
          }));
        } else {
          setFormValues((stateAlertReject) => ({
            ...stateAlertReject,
            alert: { open: true, message: res.payload, severity: "error" },
          }));
        }
      });
    }
  };

  const formValidation = (): boolean => {
    let valid = false;
    if (formValues.firstName === "")
      setFormErrors((stateFirstNameError) => ({
        ...stateFirstNameError,
        firstName: "First name is required.",
      }));
    if (formValues.lastName === "")
      setFormErrors((stateLastNameError) => ({
        ...stateLastNameError,
        lastName: "Last name is required.",
      }));
    if (formValues.gender === "")
      setFormErrors((stateGenderError) => ({
        ...stateGenderError,
        gender: "Gender is required.",
      }));
    if (birthday === null)
      setFormErrors((stateBirthdayError) => ({
        ...stateBirthdayError,
        birthday: "Birthday is required.",
      }));
    if (formValues.catalogue === "")
      setFormErrors((stateCatalogueError) => ({
        ...stateCatalogueError,
        catalogue: "Catalogue is required.",
      }));

    if (
      formValues.firstName !== "" &&
      formValues.lastName !== "" &&
      formValues.gender !== "" &&
      birthday !== null &&
      formValues.catalogue !== ""
    ) {
      valid = true;
    }

    return valid;
  };

  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    setFormValues((stateOnClose) => ({
      ...stateOnClose,
      alert: { open: false, message: "", severity: "info" },
    }));
  };

  return (
    <ActorForm
      formName={"EditForm"}
      formErrors={formErrors}
      formValues={formValues}
      birthday={birthday}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler}
      onChangeSelect={onChangeSelect}
      setBirthday={setBirthday}
      onClickCloseAlert={onClickCloseAlertHandler}
    />
  );
};

export default ActorEdit;
