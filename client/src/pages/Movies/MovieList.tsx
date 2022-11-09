import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import {
  moviesList,
  moviesDelete,
  selectMovies,
} from "../../utilities/slice/movieSlice";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteDialogue from "../../components/Dialog/DeleteDialog";
import SnackAlert from "../../components/SnackAlert";

interface RowValues {
  id?: string;
  title: string;
  cost: number;
  yearReleased: number;
  categories: string[];
  actors: string[];
  link?: string;
  movieLink: MovieLink;
}

interface MovieLink {
  catalogue: string;
  trailer?: string;
}

interface AlertData {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const MovieList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);
  const movie = useAppSelector((state) => state.movies.dataOne);
  const [alert, setAlert] = React.useState<AlertData>({
    open: false,
    message: "",
    severity: "info",
  });
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 300,
      editable: true,
    },
    {
      field: "cost",
      headerName: "Cost",
      width: 200,
      align: "right",
      valueFormatter: ({ value }) => currencyFormatter.format(value),
      editable: true,
    },
    {
      field: "yearReleased",
      headerName: "Year Released",
      sortable: false,
      width: 200,
      align: "center",
    },
    {
      field: "catalogue",
      headerName: "Catalogue",
      width: 200,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <Avatar
            variant="square"
            alt="Image Catalogue"
            src={params.row.movieLink.catalogue}
            sx={{ width: 50, height: 50 }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const onClickEdit = () => {
          navigate("../movies-edit", { state: params.row.id });
        };

        const onClickDelete = () => {
          dispatch(selectMovies({ id: params.row.id }));
          setOpen(true);
        };

        return (
          <IconButton>
            <Stack spacing={2} direction="row">
              <Tooltip title="Edit movie details">
                <EditIcon color="primary" onClick={onClickEdit} />
              </Tooltip>

              <Tooltip title="Delete movie">
                <DeleteIcon color="error" onClick={onClickDelete} />
              </Tooltip>
            </Stack>
          </IconButton>
        );
      },
    },
  ];
  const dispatch = useAppDispatch();
  const rows: RowValues[] = useAppSelector((state) => state.movies.data);

  React.useEffect(() => {
    dispatch(moviesList());
  }, [dispatch]);

  const onConfirmDelete = async () => {
    await dispatch(moviesDelete(movie.id ? movie.id : "")).then((res) => {
      if (res.type === "movies/delete/fulfilled") {
        setOpen(false);
      } else {
        setAlert({ open: true, message: res.payload, severity: "error" });
      }
    });
  };

  const onClickCloseAlertHandler = (
    event: Event | React.SyntheticEvent<any, Event>
  ): void => {
    setAlert({ open: false, message: "", severity: "info" });
  };

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
      <SnackAlert
        alertData={alert}
        onClickCloseAlert={onClickCloseAlertHandler}
      />
    </>
  );
};

export default MovieList;
