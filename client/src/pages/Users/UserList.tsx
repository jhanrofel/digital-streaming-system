import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import {
  usersApproved,
  usersDelete,
  selectUsers,
  usersUpdate,
} from "../../utilities/slice/userSlice";
import { IUserFormTable } from "../../utilities/types";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { GridColDef } from "@mui/x-data-grid";
import DeleteDialogue from "../../components/Dialog/DeleteDialog";
import FormList from "../../components/FormList";

const UserList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);
  const user = useAppSelector((state) => state.users.dataOne);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
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
      field: "role",
      headerName: "Role",
      sortable: false,
      width: 150,
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 150,
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const onClickEdit = () => {
          navigate("../users-edit", { state: params.row.id });
        };
        const onClickDelete = () => {
          dispatch(selectUsers({ id: params.row.id }));
          setOpen(true);
        };
        const onClickActivate = async (): Promise<void> => {
          const formValues: IUserFormTable = {
            id: params.row.id,
            role: params.row.role,
            email: params.row.email,
            firstName: params.row.firstName,
            lastName: params.row.lastName,
            status: "ACTIVATED",
          };
          await dispatch(usersUpdate(formValues));
        };
        const onClickDeactivate = async (): Promise<void> => {
          const formValues: IUserFormTable = {
            id: params.row.id,
            role: params.row.role,
            email: params.row.email,
            firstName: params.row.firstName,
            lastName: params.row.lastName,
            status: "DEACTIVATED",
          };
          await dispatch(usersUpdate(formValues));
        };

        return (
          params.row.email !== "admin@mail.com" && (
            <IconButton>
              <Stack spacing={2} direction="row">
                <Tooltip title="Edit actor details">
                  <EditIcon color="primary" onClick={onClickEdit} />
                </Tooltip>
                <Tooltip title="Delete actor">
                  <DeleteIcon color="error" onClick={onClickDelete} />
                </Tooltip>
                {params.row.status === "ACTIVATED" ? (
                  <Tooltip title="Deactivate user.">
                    <PersonOffIcon color="error" onClick={onClickDeactivate} />
                  </Tooltip>
                ) : (
                  <Tooltip title="Activate user.">
                    <PersonAddIcon color="primary" onClick={onClickActivate} />
                  </Tooltip>
                )}
              </Stack>
            </IconButton>
          )
        );
      },
    },
  ];
  const dispatch = useAppDispatch();
  const rows: IUserFormTable[] = useAppSelector((state) => state.users.data);

  React.useEffect(() => {
    dispatch(usersApproved());
  }, [dispatch]);

  const onConfirmDelete = async () => {
    await dispatch(usersDelete(user.id ? user.id : "")).then((res) => {
      if (res.type === "users/delete/fulfilled") {
        setOpen(false);
      }
    });
  };

  return (
    <React.Fragment>
      <FormList
        rows={rows}
        columns={columns}
      />

      <DeleteDialogue
        setOpen={setOpen}
        open={open}
        onConfirmDelete={onConfirmDelete}
      />
    </React.Fragment>
  );
};

export default UserList;
