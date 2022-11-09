import React from "react";
import { useAppDispatch } from "../../utilities/hooks";
import { actorsPost } from "../../utilities/slice/actorSlice";
import {
  IActorFormErrors,
  IActorFormValues,
  IActorFormPost,
} from "../../utilities/types";
import { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";
import ActorForm from "../../components/Actor/ActorForm";

const ActorAdd = () => {
  const dispatch = useAppDispatch();
  const [birthday, setBirthday] = React.useState<Dayjs | null>(null);
  const [formValues, setFormValues] = React.useState<IActorFormValues>({
    firstName: "",
    lastName: "",
    gender: "",
    catalogue: "",
    alert: {
      open: false,
      message: "string",
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

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
    let name = (event.target as HTMLInputElement).name;
    let value = (event.target as HTMLInputElement).value;

    switch (name) {
      case "firstName":
        setFormValues((state) => ({ ...state, firstName: value }));
        setFormErrors((state) => ({ ...state, firstName: "" }));
        break;
      case "lastName":
        setFormValues((state) => ({ ...state, lastName: value }));
        setFormErrors((state) => ({ ...state, lastName: "" }));
        break;
      case "catalogue":
        setFormValues((state) => ({ ...state, catalogue: value }));
        setFormErrors((state) => ({ ...state, catalogue: "" }));
        break;
      default:
        break;
    }
  };

  const onChangeSelect = (event: SelectChangeEvent) => {
    setFormValues((state) => ({
      ...state,
      gender: event.target.value,
    }));
    setFormErrors((state) => ({ ...state, gender: "" }));
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    if (formValidation()) {
      const postUserValue: IActorFormPost = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        gender: formValues.gender,
        birthday: birthday ? birthday.toString() : "",
        actorLink: {
          catalogue: formValues.catalogue,
        },
      };

      const actorGender = formValues.gender === "Male" ? "Actor" : "Actress";

      await dispatch(actorsPost(postUserValue)).then((res) => {
        if (res.type === "actors/post/fulfilled") {
          setFormValues((state) => ({
            ...state,
            firstName: "",
            lastName: "",
            gender: "",
            catalogue: "",
          }));
          setBirthday(null);
          setFormValues((state) => ({
            ...state,
            alert: {
              open: true,
              message: `${actorGender} added.`,
              severity: "success",
            },
          }));
        } else {
          setFormValues((state) => ({
            ...state,
            alert: { open: true, message: res.payload, severity: "error" },
          }));
        }
      });
    }
  };

  const formValidation = (): boolean => {
    let valid = false;
    if (formValues.firstName === "")
      setFormErrors((state) => ({
        ...state,
        firstName: "First name is required.",
      }));
    if (formValues.lastName === "")
      setFormErrors((state) => ({
        ...state,
        lastName: "Last name is required.",
      }));
    if (formValues.gender === "")
      setFormErrors((state) => ({
        ...state,
        gender: "Gender is required.",
      }));
    if (birthday === null)
      setFormErrors((state) => ({
        ...state,
        birthday: "Birthday is required.",
      }));
    if (formValues.catalogue === "")
      setFormErrors((state) => ({
        ...state,
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
    setFormValues((state) => ({
      ...state,
      alert: { open: false, message: "", severity: "info" },
    }));
  };

  return (
    <ActorForm
      formName={"AddForm"}
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

export default ActorAdd;
