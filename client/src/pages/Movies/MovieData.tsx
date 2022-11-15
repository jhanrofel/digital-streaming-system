import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { GridColDef } from "@mui/x-data-grid";
import { currencyFormatter } from "../../utilities/helpers";
import { useAppDispatch } from "../../utilities/hooks";
import { selectMovies, moviesById } from "../../utilities/slice/movieSlice";

const MovieData = ({ callbackDelete, callbackEdit }: any) => {
  const dispatch = useAppDispatch();

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 300,
    },
    {
      field: "cost",
      headerName: "Cost",
      width: 200,
      align: "right",
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },
    {
      field: "yearReleased",
      headerName: "Year Released",
      sortable: false,
      width: 200,
      align: "center",
    },
    {
      field: "imageLink",
      headerName: "Movie Image",
      width: 200,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <Avatar
            variant="square"
            alt="Movie Image"
            src={params.row.imageLink}
            sx={{ width: 50, height: 50 }}
          />
        );
      },
    },
    {
      field: "movies_action",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const onClickDelete = () => {
          dispatch(selectMovies(params.row.id));
          callbackDelete();
        };

        const onClickEdit = () => {
          dispatch(moviesById(params.row.id));
          callbackEdit();
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

  return { columns };
};

export default MovieData;
