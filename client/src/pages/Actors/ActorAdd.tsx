import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../utilities/hooks";
import ActorAddForm from "../../components/Actor/ActorAddForm";
import { SelectChangeEvent } from "@mui/material/Select";
import { actorsPost } from "../../utilities/slice/actorSlice";
import { Dayjs } from "dayjs";

interface FormValue {
  firstName: string;
  lastName: string;
  gender: string;
  banner: string;
  catalogue: string;
  pictures?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  trailer?: string;
  clips?: string;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  banner: string;
  catalogue: string;
  pictures?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  trailer?: string;
  clips?: string;
}

const ActorAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [birthday, setBirthday] = React.useState<Dayjs | null>(null);
  useEffect(() => {
    formErrors.birthday = "";
  }, [birthday]);
  

  const [formValues, setFormValues] = React.useState<FormValue>({
    firstName: "",
    lastName: "",
    gender: "",
    banner: "",
    catalogue: "",
    pictures: "",
    facebook: "",
    instagram: "",
    youtube: "",
    trailer: "",
    clips: "",
  });

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
      case "pictures":
        setFormValues((state) => ({ ...state, pictures: value }));
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
      case "clips":
        setFormValues((state) => ({ ...state, clips: value }));
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
    actorLink: ActorLink;
  }

  interface ActorLink {
    banner: string;
    catalogue: string;
    pictures?: string[];
    facebook?: string;
    instagram?: string;
    youtube?: string;
    trailer?: string;
    clips?: string[];
  }

  const onClickSubmitHandler = async (): Promise<void> => {
    if (formValidation()) {
      const postUserValue: ActorDataOne = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        gender: formValues.gender,
        birthday: birthday?birthday.toString():"",
        actorLink: {
          banner: formValues.banner,
          catalogue: formValues.catalogue,
          pictures: [],
          facebook: formValues.facebook,
          instagram: formValues.instagram,
          youtube: formValues.youtube,
          trailer: formValues.trailer,
          clips: [],
        },
      };

      await dispatch(actorsPost(postUserValue)).then((res) => {
        if (res.type === "actors/post/fulfilled") {
          setFormValues((state) => ({
            ...state,
            firstName: "",
            lastName: "",
            gender: "",
            banner: "",
            catalogue: "",
            pictures: "",
            facebook: "",
            instagram: "",
            youtube: "",
            trailer: "",
            clips: "",
          }));
          setBirthday(null);
          alert("Actor added.");
        } else {
          alert(res.payload);
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
    <ActorAddForm
      formErrors={formErrors}
      formValues={formValues}
      birthday={birthday}
      onChange={onChangeHandler}
      onClick={onClickSubmitHandler}
      onChangeSelect={onChangeSelect}
      setBirthday={setBirthday}
    />
  );
};

export default ActorAdd;
