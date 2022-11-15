import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import TheatersIcon from "@mui/icons-material/Theaters";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { getAge } from "../../utilities/helpers";
import { useAppDispatch } from "../../utilities/hooks";
import { selectActors, actorById } from "../../utilities/slice/actorSlice";
import { useNavigate } from "react-router-dom";

const ActorData = ({ callbackDelete, callbackEdit }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "First Name",
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
      width: 200,
      align: "center",
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
      headerName: "Actor Image",
      width: 200,
      align: "center",
      renderCell: (params) => {
        return (
          <Avatar
            variant="square"
            alt="Actor Image"
            src={params.row.imageLink}
            sx={{ width: 50, height: 50 }}
          />
        );
      },
    },
    {
      field: "actors_action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const onClickDelete = () => {
          dispatch(selectActors(params.row.id));
          callbackDelete();
        };

        const onClickEdit = () => {
          dispatch(actorById(params.row.id));
          callbackEdit();
        };

        const onClickMovies = () => {
          navigate("../actors-movies", { state: params.row.id });
        };

        return (
          <IconButton>
            <Stack spacing={2} direction="row">
              <Tooltip title="Edit movie details">
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

  return { columns };
};

export default ActorData;
