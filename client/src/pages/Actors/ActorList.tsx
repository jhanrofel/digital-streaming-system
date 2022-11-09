import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { useNavigate } from "react-router-dom";
import {
  actorsList,
  actorsDelete,
  selectActors,
} from "../../utilities/slice/actorSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TheatersIcon from "@mui/icons-material/Theaters";
import Avatar from "@mui/material/Avatar";
import DeleteDialogue from "../../components/Dialog/DeleteDialog";

interface RowValues {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  link?: string;
  actorLink: ActorLink;
}

interface ActorLink {
  catalogue: string;
}

const ActorList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);
  const actor = useAppSelector((state) => state.actors.dataOne);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 200,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 200,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      sortable: false,
      width: 150,
    },
    {
      field: "birthday",
      headerName: "Birtday",
      sortable: false,
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.birthday.substring(0, 10)}`,
    },
    {
      field: "catalogue",
      headerName: "Catalogue",
      sortable: false,
      width: 150,
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
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const onClickEdit = () => {
          navigate("../actors-edit", { state: params.row.id });
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
  const dispatch = useAppDispatch();
  const rows: RowValues[] = useAppSelector((state) => state.actors.data);
  const onConfirmDelete = async () => {
    await dispatch(actorsDelete(actor.id ? actor.id : "")).then((res) => {
      if (res.type === "actors/delete/fulfilled") {
        setOpen(false);
      }
    });
  };

  React.useEffect(() => {
    dispatch(actorsList());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
        />
      </Box>
      <DeleteDialogue
        setOpen={setOpen}
        open={open}
        onConfirmDelete={onConfirmDelete}
      />
    </>
  );
};

export default ActorList;
