import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import {
  usersApproved,
  usersDelete,
  selectUsers,
} from "../../utilities/slice/userSlice";
import DeleteDialogue from "../../components/Dialog/DeleteDialog";

interface RowValues {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

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
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        // const onClickRoleAdmin = async () => {
        //   const formValues: ApproveFormValues = {
        //     id: params.id,
        //     approval: "approved",
        //     role: "ADMIN",
        //     form: "list",
        //   };
        //   await dispatch(usersApprove(formValues));
        // };

        // const onClickRoleUser = async () => {
        //   const formValues: ApproveFormValues = {
        //     id: params.id,
        //     approval: "approved",
        //     role: "USER",
        //     form: "list",
        //   };
        //   await dispatch(usersApprove(formValues));
        // };

        const onClickEdit = () => {
          navigate("../users-edit", { state: params.row.id });
        };
        const onClickDelete = () => {
          dispatch(selectUsers({ id: params.row.id }));
          setOpen(true);
        };

        return (
          <IconButton>
            <Stack spacing={2} direction="row">
              <Tooltip title="Edit actor details">
                <EditIcon color="primary" onClick={onClickEdit} />
              </Tooltip>
              <Tooltip title="Delete actor">
                <DeleteIcon color="error" onClick={onClickDelete} />
              </Tooltip>
            </Stack>
          </IconButton>
        );
      },
    },
  ];
  const dispatch = useAppDispatch();
  const rows: RowValues[] = useAppSelector((state) => state.users.data);

  React.useEffect(() => {
    dispatch(usersApproved());
  }, [dispatch]);

  const onConfirmDelete = async () => {
    await dispatch(usersDelete(user.id ? user.id : "")).then((res) => {
      if (res.type === "users/delete/fulfilled") {
        setOpen(false);
      } else {
        alert(res.payload);
      }
    });
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
    </>
  );
};

export default UserList;
