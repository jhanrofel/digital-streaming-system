import { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { useNavigate } from "react-router-dom";
import { moviesList, moviesDelete } from "../../utilities/slice/movieSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TheatersIcon from "@mui/icons-material/Theaters";

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
  banner: string;
  catalogue: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const MovieList = () => {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      editable: true,
    },
    {
      field: "cost",
      headerName: "Cost",
      width: 150,
      align: "right",
      valueFormatter: ({ value }) => currencyFormatter.format(value),
      editable: true,
    },
    {
      field: "yearReleased",
      headerName: "Year Released",
      sortable: false,
      width: 150,
      align: "center",
    },
    {
      field: "banner",
      headerName: "Banner",
      sortable: false,
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.movieLink.banner}`,
    },
    {
      field: "catalogue",
      headerName: "Catalogue",
      sortable: false,
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.movieLink.catalogue}`,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const onClickEdit = () => {
          navigate("../movies-edit", { state: params.row.id });
        };

        const onClickMovies = () => {
          navigate("../movies-movies", { state: params.row.id });
        };

        const onClickDelete = () => {
          dispatch(moviesDelete(params.row.id));
        };

        return (
          <IconButton>
            <Stack spacing={2} direction="row">
              <Tooltip title="Edit movie details">
                <EditIcon color="primary" onClick={onClickEdit} />
              </Tooltip>
              {params.row.movieMovies ? (
                <Tooltip title="Movie belongs">
                  <TheatersIcon color="primary" onClick={onClickMovies} />
                </Tooltip>
              ) : (
                <Tooltip title="Delete movie">
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
  const rows: RowValues[] = useAppSelector((state) => state.movies.data);

  useEffect(() => {
    dispatch(moviesList());
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

export default MovieList;
