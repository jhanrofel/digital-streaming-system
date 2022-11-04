import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import ActorEditForm from "../../components/Actor/ActorEditForm";
import { SelectChangeEvent } from "@mui/material/Select";
import dayjs, { Dayjs } from "dayjs";
import { actorsOne, actorsUpdate } from "../../utilities/slice/actorSlice";

interface FormValue {
  firstName: string;
  lastName: string;
  gender: string;
  link: string;
  banner: string;
  catalogue: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  trailer?: string;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  banner: string;
  catalogue: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  trailer?: string;
}

interface AlertData {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

const ActorEdit = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const actorId = state;
  const actor = useAppSelector((state) => state.actors.dataOne);
  const [alertData, setAlertData] = React.useState<AlertData>({
    open: false,
    message: "",
    severity: "info",
  });
  const [birthday, setBirthday] = React.useState<Dayjs | null>(null);
  useEffect(() => {
    formErrors.birthday = "";// eslint-disable-next-line
  }, [birthday]);

  useEffect(() => {
    dispatch(actorsOne(actorId));
  }, [dispatch, actorId]);

  const [formValues, setFormValues] = React.useState<FormValue>({
    firstName: actor.firstName || "",
    lastName: actor.lastName || "",
    gender: actor.gender || "",
    link: actor.link || "",
    banner: "",
    catalogue: "",
    facebook: "",
    instagram: "",
    youtube: "",
    trailer: "",
  });

  useEffect(() => {
    setFormValues((state) => ({
      ...state,
      firstName: actor.firstName || "",
      lastName: actor.lastName || "",
      gender: actor.gender || "",
      link: actor.link || "",
      banner: actor.actorLink ? actor.actorLink.banner : "",
      catalogue: actor.actorLink ? actor.actorLink.catalogue : "",
      facebook: actor.actorLink ? actor.actorLink.facebook : "",
      instagram: actor.actorLink ? actor.actorLink.instagram : "",
      youtube: actor.actorLink ? actor.actorLink.youtube : "",
    }));

    setBirthday(dayjs(actor.birthday));
  }, [actor]);

  const [formErrors, setFormErrors] = React.useState<FormErrors>({
    firstName: "",
    lastName: "",
    gender: "",
    birthday: "",
    banner: "",
    catalogue: "",
  });

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
    setFormValues((state) => ({
      ...state,
      gender: event.target.value,
    }));
    setFormErrors((state) => ({ ...state, gender: "" }));
  };

  interface ActorDataOne {
    id?: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string;
    link: string;
    actorLink: ActorLink;
  }

  interface ActorLink {
    banner: string;
    catalogue: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    trailer?: string;
  }

  const onClickSubmitHandler = async (): Promise<void> => {
    if (formValidation()) {
      const postUserValue: ActorDataOne = {
        id: actorId,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        gender: formValues.gender,
        birthday: birthday ? birthday.toString() : "",
        link: formValues.link,
        actorLink: {
          banner: formValues.banner,
          catalogue: formValues.catalogue,
          facebook: formValues.facebook,
          instagram: formValues.instagram,
          youtube: formValues.youtube,
          trailer: formValues.trailer,
        },
      };

      const actorGender = formValues.gender === "Male" ? "Actor" : "Actress";

      await dispatch(actorsUpdate(postUserValue)).then((res) => {
        if (res.type === "actors/update/fulfilled") {
          setAlertData({
            open: true,
            message: `${actorGender} updated.`,
            severity: "success",
          });
        } else {
          setAlertData({ open: true, message: res.payload, severity: "error" });
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

    if (
      formValues.firstName !== "" &&
      formValues.lastName !== "" &&
      formValues.gender !== "" &&
      birthday !== null &&
      formValues.banner !== "" &&
      formValues.catalogue !== ""
    ) {
      valid = true;
    }

    return valid;
  };

  return (
    <ActorEditForm
      formErrors={formErrors}
      formValues={formValues}
      birthday={birthday}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler}
      onChangeSelect={onChangeSelect}
      setBirthday={setBirthday}
      alertData={alertData}
      setAlertData={setAlertData}
    />
  );
};

export default ActorEdit;
