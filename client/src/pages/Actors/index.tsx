import React from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TheatersIcon from "@mui/icons-material/Theaters";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { getAge } from "../../utilities/helpers";
import {
  actorsList,
  actorsDelete,
  actorsUpdate,
  actorsPost,
  clearSelected,
  getActorById,
  selectActors,
} from "../../utilities/slice/actorSlice";
import { IActorData, IActorForm, IAlert } from "../../utilities/types";
import { actorFormReset, alertDataReset } from "../../utilities/formValues";
import DeleteDialogue from "../../components/Dialog/DeleteDialog";
import FormList from "../../components/FormList";
import FormHeader from "../../components/FormHeader";
import ActorForm from "../../components/Actor/ActorForm";
import SnackAlert from "../../components/SnackAlert";

const ActorList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const actor = useAppSelector((state) => state.actors.byId);
  const actorId = useAppSelector((state) => state.actors.selected);
  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "First name",
      width: 200,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 200,
    },
    {
      field: "gender",
      headerName: "Gender",
      sortable: false,
      width: 150,
    },
    {
      field: "age",
      headerName: "Age",
      sortable: false,
      align: "right",
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        `${getAge(params.row.birthday.substring(0, 10))}`,
    },
    {
      field: "imageLink",
      headerName: "Image Link",
      sortable: false,
      width: 200,
      align: "center",
      renderCell: (params) => {
        return (
          <Avatar
            variant="square"
            alt="Image Link"
            src={params.row.imageLink}
            sx={{ width: 50, height: 50 }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const onClickEdit = () => {
          dispatch(getActorById(params.row.id));
          setOpenActorForm(true);
        };

        const onClickMovies = () => {
          navigate("../actors-movies", { state: params.row.id });
        };

        const onClickDelete = () => {
          dispatch(selectActors({ id: params.row.id }));
          setOpenDialogue(true);
        };

        return (
          <IconButton>
            <Stack spacing={2} direction="row">
              <Tooltip title="Edit actor details">
                <EditIcon color="primary" onClick={onClickEdit} />
              </Tooltip>
              {params.row.actorMovies ? (
                <Tooltip title="Movie belongs">
                  <TheatersIcon color="primary" onClick={onClickMovies} />
                </Tooltip>
              ) : (
                <Tooltip title="Delete actor">
                  <DeleteIcon color="error" onClick={onClickDelete} />
                </Tooltip>
              )}
            </Stack>
          </IconButton>
        );
      },
    },
  ];
  const rows: IActorData[] = useAppSelector((state) => state.actors.list);

  const onConfirmDelete = async (): Promise<void> => {
    await dispatch(actorsDelete(actorId ? actorId : "")).then((res) => {
      if (res.type === "actors/delete/fulfilled") {
        setOpenDialogue(false);
      }
    });
  };

  React.useEffect(() => {
    dispatch(actorsList());
  }, [dispatch]);

  React.useEffect(() => {
    setFormValues((stateForm) => ({
      ...stateForm,
      firstName: actor?.firstName || "",
      lastName: actor?.lastName || "",
      gender: actor?.gender || "",
      birthday: actor?.birthday || "",
      imageLink: actor?.imageLink || "",
    }));
  }, [dispatch, actor]);

  const onClickHandlerFormOpen = () => {
    setOpenActorForm(true);
  };
  const onClickHandlerFormClose = () => {
    setOpenActorForm(false);
    setFormValues(actorFormReset);
    setFormErrors(actorFormReset);
    dispatch(clearSelected());
  };

  const headerButtons = [{ label: "Add", onClick: onClickHandlerFormOpen }];
  const [formErrors, setFormErrors] =
    React.useState<IActorForm>(actorFormReset);
  const [formValues, setFormValues] =
    React.useState<IActorForm>(actorFormReset);

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
      case "imageLink":
        setFormValues((state) => ({ ...state, imageLink: value }));
        setFormErrors((state) => ({ ...state, imageLink: "" }));
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

  const onChangeDateHandler = (newValue: string): void => {
    setFormValues((state) => ({
      ...state,
      birthday: newValue,
    }));
    setFormErrors((state) => ({ ...state, birthday: "" }));
  };

  const onClickSubmitHandler = async (): Promise<void> => {
    if (formValidation()) {
      const postUserValue: IActorForm = {
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
                ...postUserValue,
                id: actor.id,
              })
            )
          : await dispatch(actorsPost(postUserValue));

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
        setFormValues((state) => ({
          ...state,
          alert: {
            open: true,
            message: dispatchResponse.payload,
            severity: "error",
          },
        }));
        setAlert({
          open: true,
          message: dispatchResponse.payload,
          severity: "error",
        });
      }
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
    if (formValues.birthday === "")
      setFormErrors((state) => ({
        ...state,
        birthday: "Birthday is required.",
      }));
    if (formValues.imageLink === "")
      setFormErrors((state) => ({
        ...state,
        imageLink: "Image link is required.",
      }));

    if (
      formValues.firstName !== "" &&
      formValues.lastName !== "" &&
      formValues.gender !== "" &&
      formValues.birthday !== "" &&
      formValues.imageLink !== ""
    ) {
      valid = true;
    }

    return valid;
  };

  const [openActorForm, setOpenActorForm] = React.useState(false);

  const [openDialogue, setOpenDialogue] = React.useState<boolean>(false);

  const [alertData, setAlert] = React.useState<IAlert>(alertDataReset);
  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    setAlert(alertDataReset);
  };

  const resetFormValues = () => {
    setFormErrors(actorFormReset);
    setFormValues(actorFormReset);
    setOpenActorForm(false);
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
        onChange={onChangeHandler}
        onClick={onClickSubmitHandler}
        onChangeSelect={onChangeSelect}
        onClickHandlerFormClose={onClickHandlerFormClose}
        onChangeDate={onChangeDateHandler}
      />
      <SnackAlert
        alertData={alertData}
        onClickCloseAlert={onClickCloseAlertHandler}
      />
    </React.Fragment>
  );
};

export default ActorList;
