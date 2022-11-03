import { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { useNavigate } from "react-router-dom";
import { actorsList, actorsDelete } from "../../utilities/slice/actorSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TheatersIcon from "@mui/icons-material/Theaters";

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
  banner: string;
  catalogue: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

const ActorList = () => {
  const navigate = useNavigate();
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
      field: "banner",
      headerName: "Banner",
      sortable: false,
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.actorLink.banner}`,
    },
    {
      field: "catalogue",
      headerName: "Catalogue",
      sortable: false,
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.actorLink.catalogue}`,
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
          dispatch(actorsDelete(params.row.id));
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

  useEffect(() => {
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
    </>
  );
};

export default ActorList;
