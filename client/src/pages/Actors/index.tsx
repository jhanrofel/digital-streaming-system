import React from "react";
import Container from "@mui/material/Container";
import {
  useAppDispatch,
  useAppSelector,
  useFormValidation,
} from "../../utilities/hooks";
import {
  actorsList,
  actorsDelete,
  actorsUpdate,
  actorsPost,
  clearSelected,
} from "../../utilities/slice/actorSlice";
import { IActorData, IActorForm, IAlert } from "../../utilities/types";
import { actorFormReset, alertDataReset } from "../../utilities/formValues";
import DeleteDialogue from "../../components/Dialog/DeleteDialog";
import FormList from "../../components/FormList";
import FormHeader from "../../components/FormHeader";
import ActorForm from "../../components/Actor/ActorForm";
import SnackAlert from "../../components/SnackAlert";
import ActorData from "./ActorData";

const ActorList = () => {
  const dispatch = useAppDispatch();
  const actorSelected = useAppSelector((state) => state.actors.selected);
  const actor = useAppSelector((state) => state.actors.byId);
  const [defaultValue, setDefaultValue] =
    React.useState<IActorForm>(actorFormReset);
  const rows: IActorData[] = useAppSelector((state) => state.actors.list);

  const onClickDeleteIcon = () => {
    setOpenDialogue(true);
  };

  const onClickEditIcon = () => {
    setTimeout(() => {
      setOpenActorForm(true);
    }, 100);

    if (actor) {
      setDefaultValue({
        ...defaultValue,
        firstName: actor.firstName,
        lastName: actor.lastName,
        gender: actor.gender,
        birthday: actor.birthday,
        imageLink: actor.imageLink,
      });
      console.log(actor);
    }
  };

  const { columns } = ActorData({
    callbackDelete: onClickDeleteIcon,
    callbackEdit: onClickEditIcon,
  });

  const onConfirmDelete = async (): Promise<void> => {
    if (actorSelected) {
      await dispatch(actorsDelete(actorSelected)).then((res) => {
        if (res.type === "actors/delete/fulfilled") {
          setOpenDialogue(false);
        } else {
          setAlert({ open: true, message: res.payload, severity: "error" });
          setOpenDialogue(false);
        }
      });
    }
  };

  React.useEffect(() => {
    dispatch(actorsList());
  }, [dispatch]);

  React.useEffect(() => {
    if (actor) {
      const newValue = {
        firstName: actor.firstName,
        lastName: actor.lastName,
        gender: actor.gender ? actor.gender : "Male",
        birthday: actor.birthday,
        imageLink: actor.imageLink,
      };
      setDefaultValue({ ...actorFormReset, ...newValue });
      setForm(newValue);
    } // eslint-disable-next-line
  }, [actor]);

  const onClickHandlerFormClose = () => {
    setOpenActorForm(false);
    dispatch(clearSelected());
    resetForm();    
    setDefaultValue(actorFormReset);
  };

  const onClickHandlerFormOpen = () => {
    setOpenActorForm(true);
  };
  const headerButtons = [{ label: "Add", onClick: onClickHandlerFormOpen }];

  const onClickSubmitHandler = async (): Promise<void> => {
    const postActorForm: IActorForm = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      gender: formValues.gender,
      birthday: formValues.birthday,
      imageLink: formValues.imageLink,
    };

    const actorGender = formValues.gender === "Male" ? "Actor" : "Actress";

    const dispatchResponse =
      actor && actor.id
        ? await dispatch(
            actorsUpdate({
              ...postActorForm,
              id: actor.id,
            })
          )
        : await dispatch(actorsPost(postActorForm));

    if (dispatchResponse.type === "actors/post/fulfilled") {
      resetFormValues();
      setAlert({
        open: true,
        message: `${actorGender} added!`,
        severity: "success",
      });
    } else if (dispatchResponse.type === "actors/update/fulfilled") {
      resetFormValues();
      setAlert({
        open: true,
        message: `${actorGender} updated!`,
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

  const {
    onChangeHandler,
    onClickHandler,
    onChangeSelect,
    onChangeDateBirthday,
    formValues,
    formErrors,
    resetForm,
    setForm,
  } = useFormValidation({
    callback: onClickSubmitHandler,
    fieldsToValidate: [
      "firstName",
      "lastName",
      "gender",
      "birtday",
      "imageLink",
    ],
  });

  const [openActorForm, setOpenActorForm] = React.useState(false);

  const [openDialogue, setOpenDialogue] = React.useState<boolean>(false);

  const [alertData, setAlert] = React.useState<IAlert>(alertDataReset);
  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    setAlert(alertDataReset);
  };

  const resetFormValues = () => {
    setOpenActorForm(false);
    resetForm();
    setAlert(alertDataReset);
  };

  return (
    <React.Fragment>
      <Container sx={{ marginTop: 10 }}>
        <FormHeader header="ACTORS" buttons={headerButtons} />
        <FormList rows={rows} columns={columns} />
        <DeleteDialogue
          setOpen={setOpenDialogue}
          open={openDialogue}
          onConfirmDelete={onConfirmDelete}
        />
      </Container>
      <ActorForm
        openActorForm={openActorForm}
        formName={"AddForm"}
        formErrors={formErrors}
        formValues={formValues}
        defaultValue={defaultValue}
        onChange={onChangeHandler}
        onClickHandler={onClickHandler}
        onChangeSelect={onChangeSelect}
        onClickHandlerFormClose={onClickHandlerFormClose}
        onChangeDate={onChangeDateBirthday}
      />
      <SnackAlert
        alertData={alertData}
        onClickCloseAlert={onClickCloseAlertHandler}
      />
    </React.Fragment>
  );
};

export default ActorList;
