import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { GridColDef } from "@mui/x-data-grid";
import { useAppDispatch } from "../../utilities/hooks";
import { selectUsers, usersById } from "../../utilities/slice/userSlice";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOffIcon from "@mui/icons-material/PersonOff";

const UserData = ({ callbackDelete, callbackEdit, callbackActivate }: any) => {
  const dispatch = useAppDispatch();

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
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 200,
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      align: "center",
      width: 200,
    },
    {
      field: "users_action",
      headerName: "Action",
      width: 200,
      align: "center",
      renderCell: (params) => {
        const onClickDelete = () => {
          dispatch(selectUsers(params.row.id));
          callbackDelete();
        };

        const onClickEdit = () => {
          dispatch(usersById(params.row.id));
          callbackEdit();
        };
        const onClickActivate = async (): Promise<void> => {
          callbackActivate({ id: params.row.id, status: "ACTIVATED" });
        };
        const onClickDeactivate = async (): Promise<void> => {
          callbackActivate({ id: params.row.id, status: "DEACTIVATED" });
        };

        return (
          <IconButton>
            <Stack spacing={2} direction="row">
              <Tooltip title="Edit movie details">
                <EditIcon color="primary" onClick={onClickEdit} />
              </Tooltip>
              {params.row.status === "ACTIVATED" ? (
                <Tooltip
                  title="Deactivate user."
                  key={`deactivate_${params.row.id}`}
                >
                  <PersonOffIcon color="error" onClick={onClickDeactivate} />
                </Tooltip>
              ) : (
                <Tooltip
                  title="Activate user."
                  key={`activate_${params.row.id}`}
                >
                  <PersonAddIcon color="primary" onClick={onClickActivate} />
                </Tooltip>
              )}
              <Tooltip title="Delete user">
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

export default UserData;
