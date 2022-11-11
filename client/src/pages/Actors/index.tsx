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
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { getAge } from "../../utilities/helpers";
import {
  actorsOne,
  actorsList,
  actorsDelete,
  selectActors,
  clearActorOne,
  actorsUpdate,
  actorsPost,
} from "../../utilities/slice/actorSlice";
import {
  IActorFormPost,
  IActorFormErrors,
  IActorFormValues,
} from "../../utilities/types";
import { actorFormErrors, actorFormValues } from "../../utilities/formValues";
import DeleteDialogue from "../../components/Dialog/DeleteDialog";
import FormList from "../../components/FormList";
import FormHeader from "../../components/FormHeader";
import ActorForm from "../../components/Actor/ActorForm";
import SnackAlert from "../../components/SnackAlert";

const ActorList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState<boolean>(false);
  const actor = useAppSelector((state) => state.actors.dataOne);
  const actorId = useAppSelector((state) => state.actors.selectedId);
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
      field: "catalogue",
      headerName: "Catalogue",
      sortable: false,
      width: 200,
      align: "center",
      renderCell: (params) => {
        return (
          <Avatar
            variant="square"
            alt="Image Catalog"
            src={params.row.actorLink.catalogue}
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
          dispatch(actorsOne(params.row.id));
          setOpenActorForm(true);
        };

        const onClickMovies = () => {
          navigate("../actors-movies", { state: params.row.id });
        };

        const onClickDelete = () => {
          dispatch(selectActors({ id: params.row.id }));
          setOpen(true);
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
  const rows: IActorFormPost[] = useAppSelector((state) => state.actors.data);
  const onConfirmDelete = async (): Promise<void> => {
    console.log(actorId);
    await dispatch(actorsDelete(actorId ? actorId : "")).then((res) => {
      if (res.type === "actors/delete/fulfilled") {
        setOpen(false);
      }
    });
  };

  React.useEffect(() => {
    dispatch(actorsList());
  }, [dispatch]);

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
  }, [dispatch, actor]);

  const [openActorForm, setOpenActorForm] = React.useState(false);

  const onClickHandlerFormOpen = () => {
    setOpenActorForm(true);
  };
  const onClickHandlerFormClose = () => {
    setOpenActorForm(false);
    setFormValues(actorFormValues);
    setFormErrors(actorFormErrors);
    setBirthday(dayjs());
    dispatch(clearActorOne());
  };

  const headerButtons = [{ label: "Add", onClick: onClickHandlerFormOpen }];
  const [birthday, setBirthday] = React.useState<Dayjs | null>(null);
  const [formErrors, setFormErrors] =
    React.useState<IActorFormErrors>(actorFormErrors);
  const [formValues, setFormValues] =
    React.useState<IActorFormValues>(actorFormValues);

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

      const dispatchResponse =
        actor && actor.id
          ? await dispatch(
              actorsUpdate({
                ...postUserValue,
                id: actor.id,
                link: formValues.link,
              })
            )
          : await dispatch(actorsPost(postUserValue));

      if (dispatchResponse.type === "actors/post/fulfilled") {
        resetFormValues(`${actorGender} added.`);
      } else if (dispatchResponse.type === "actors/update/fulfilled") {
        resetFormValues(`${actorGender} updated.`);
      } else {
        setFormValues((state) => ({
          ...state,
          alert: {
            open: true,
            message: dispatchResponse.payload,
            severity: "error",
          },
        }));
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

  const resetFormValues = (message:string) => {
    setFormErrors(actorFormErrors);
    setFormValues({
      ...actorFormValues,
      alert: {
        open: true,
        message: message,
        severity: "success",
      },
    });
    setOpenActorForm(false);
    setBirthday(dayjs())
  }

  return (
    <React.Fragment>
      <Container sx={{ marginTop: 10 }}>
        <FormHeader header="ACTORS" buttons={headerButtons} />
        <FormList rows={rows} columns={columns} />
        <DeleteDialogue
          setOpen={setOpen}
          open={open}
          onConfirmDelete={onConfirmDelete}
        />
      </Container>
      <ActorForm
        openActorForm={openActorForm}
        formName={"AddForm"}
        formErrors={formErrors}
        formValues={formValues}
        birthday={birthday}
        onChange={onChangeHandler}
        onClick={onClickSubmitHandler}
        onChangeSelect={onChangeSelect}
        setBirthday={setBirthday}
        onClickHandlerFormClose={onClickHandlerFormClose}
      />      
      <SnackAlert
              alertData={formValues.alert}
              onClickCloseAlert={onClickCloseAlertHandler}
            />
    </React.Fragment>
  );
};

export default ActorList;
